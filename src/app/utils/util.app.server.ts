import type { PortValueType, ShutdownOptionsParamsType, ShutdownSequenceReturnType } from "@_types/app.type";
import config from '@_configs/index';
import { once } from 'events';

export const port = ((val: string | number): PortValueType => {
  let port: number = Number(val);

  // named pipe
  if (Object.is(port, NaN)) { return val; }

  // port number
  if (port >= 0) { return port; }

  return false;
})(config.env.app.port);

const waitForSocketsToClose = async (sockets: Set<any>, timeoutMs: number) => {
  if (sockets.size === 0) return;

  // 각 소켓에 대해 close 이벤트 Promise 생성
  const closePromises: Promise<void>[] = [];
  for (const s of sockets) {
    // 만약 이미 닫혀있다면 바로 skip
    if (s.destroyed) continue;
    // 'close' 이벤트가 발생하면 resolve
    closePromises.push(once(s, 'close').then(() => { }));
  }

  // Promise that resolves when all closePromises resolve
  const allClosePromise = Promise.all(closePromises);

  // timeout Promise
  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(resolve, timeoutMs);
  });

  // Wait for either all sockets closed OR timeout
  await Promise.race([allClosePromise, timeoutPromise]);
};

export const shutdownSequence = async (opts: ShutdownOptionsParamsType): Promise<ShutdownSequenceReturnType> => {
  const {
    server,
    resources = [],
    timeoutMs = 10_000,
  } = opts;

  const sockets = new Set<any>();
  if (server) {
    server.on('connection', (socket) => {
      sockets.add(socket);
      socket.on('close', () => sockets.delete(socket));
    });
  }

  const closeServer = async (): Promise<void> => {
    if (!server) return Promise.resolve();
    return new Promise((resolve) => {
      try {
        server.close((err?: Error) => { resolve(); });
      } catch (err) {
        console.error('[shutdown] server.close threw', err);
        resolve();
      }
    });
  };

  const runCloseResources = async () => {
    for (const r of resources) {
      if (r.close) {
        try {
          await Promise.resolve(r.close());
          console.info(`[shutdown] resource closed: ${r.name}`);
        } catch (err) {
          console.error(`[shutdown] resource close failed: ${r.name}`, err);
        }
      } else {
        console.info(`[shutdown] no close method for: ${r.name}`);
      }
    }
  }

  // "정중히" 종료 시도: socket.end(), 일정 시간 후 socket.destroy()
  const politelyCloseSockets = (gracePeriod = 5_000) => {
    for (const s of sockets) {
      try {
        // if writable, end to signal FIN to peer
        if (!s.destroyed) {
          s.end();
        }
      } catch (e) {
        /* ignore */
      }
    }
    // after gracePeriod, force destroy remaining
    setTimeout(() => {
      for (const s of sockets) {
        try {
          if (!s.destroyed) s.destroy();
        } catch (e) { }
      }
    }, gracePeriod).unref();
  };

  const gracefulShutdown = async () => {

    // 1) stop accepting new connections and wait for existing ones to finish
    await closeServer();
    console.info('[shutdown] http server closed (stopped accepting new connections)');

    // 2) close other resources (db pools, queues, etc.)
    politelyCloseSockets(5_000);
    await runCloseResources();
    waitForSocketsToClose(sockets, 200);
    // const start = Date.now();
    // while (sockets.size > 0 && Date.now() - start < timeoutMs) {
    //   await new Promise((r) => setTimeout(r, 200));
    // }
    // // finally, destroy any remaining
    for (const s of sockets) {
      try { if (!s.destroyed) s.destroy(); } catch (e) { }
    }
    process.exit(0);
  };

  let shutdownFlag = false;

  const handleSignal = (signal: string) => async () => {
    if (shutdownFlag) { console.warn('shutdown already in progress'); return; }
    shutdownFlag = true;
    if(signal) console.info('received', signal);
    try {
      await gracefulShutdown();
      process.exit(0);
    } catch (e) {
      console.error('shutdown error', e);
      process.exit(1);
    }
  };

  return {
    handleSignal,
    gracefulShutdown, // expose for programmatic calls
  };
};