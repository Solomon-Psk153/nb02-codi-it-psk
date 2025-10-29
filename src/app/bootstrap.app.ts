import { initDI } from "@_di/container.di";

import config from '@_configs/index';
import { createApp } from "./init.app";
import http from "node:http";
import { port, shutdownSequence } from "./utils/util.app.server";
import { closeDBInstance } from "./utils/util.app.db";
import { appLogLevel } from "@_consts/app.consts";
import { Knex } from "knex";
import { ServerAddressType } from "@_types/app.type";
import { AddressInfo } from "node:net";

export async function bootstrap() {
  const container = await initDI({ config });
  const app = await createApp({ container });
  
  const server = http.createServer(app);

  server.listen(port, () => { console.log(`server start port ${port}`); });

  const pg = container.resolve<Knex>("db");
  const resources = [
    { name: "knex", close: async () => { await closeDBInstance({ dbInstance: pg }) } },
    { name: "container", close: async () => { await container.dispose(); } }
  ];

  const { handleSignal, gracefulShutdown } = await shutdownSequence({
    server, resources, timeoutMs: 5_000,
    onShutdown: async ({ signal, reason }) => {
      console.info(`[shutdown] onShutdown hook start for ${signal}`);
      if (reason) console.error('[shutdown] reason:', reason);
      // optional: flush logs, notify monitoring etc.
    }
  });

  /**
   * Event listener for HTTP server "listening" event.
   * AddressInfo 객체 ({ address: string, family: string, port: number }) — TCP 포트로 바인딩된 경우
   * string — 네임드 파이프(named pipe)로 바인딩된 경우(Windows 등)
   * null — 서버가 바인딩되기 전 또는 이미 닫힌 경우
   */
  server.on('listening', (): void => {
    // server.address()는 AddressInfo | string | null을 반환
    const addr: ServerAddressType = server.address();

    // 보통 listening 이벤트에서는 addr가 null이 나오지 않지만 안전하게 검사
    if (!addr) {
      console.log('server listening but server.address() returned null');
      return;
    }

    // addr이 string이면 named pipe, object이면 포트 정보가 존재
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr as AddressInfo).port;

    // 실제로 bind를 로그/디버그에 남깁니다 (원래 코드에서 빠졌던 부분)
    console.log(`Listening on ${bind}`);
    // 혹은 debug 패키지를 쓰면:
    // debug('Listening on ' + bind);
  });

  server.on("error", async (error: NodeJS.ErrnoException): Promise<void> => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    const errorMsg = appLogLevel === "debug" ? error : error.code;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + ` requires elevated privileges ${errorMsg}`);
        await gracefulShutdown();
        break;
      case "EADDRINUSE":
        console.error(bind + ` is already in use ${errorMsg}`);
        await gracefulShutdown();
        break;
      case "EADDRNOTAVAIL":
        console.error(bind + ` Address not available ${errorMsg}`);
        await gracefulShutdown();
        break;
      case "EAFNOSUPPORT":
        console.error(bind + ` Address family not supported ${errorMsg}`);
        await gracefulShutdown();
        break;

      // case "EINVAL":
      // case "EMFILE":
      // case "ENFILE":
      // case "EPIPE":
      // case "ECONNRESET":

      default:
        console.error(`Unhandled server error ${errorMsg}`);
        await gracefulShutdown();
    }
  });


  process.on("SIGINT", handleSignal("SIGINT"));
  process.on("SIGTERM", handleSignal("SIGTERM"));
  process.on("SIGQUIT", handleSignal("SIGQUIT"));
  process.on("SIGUSR2", handleSignal("SIGUSR2"));

  return server;
}



// // handle specific listen errors with friendly messages
// switch (error.code) {
//   case "EACCES":
//     console.error(bind + ` requires elevated privileges ${errorMsg}`);
//     void gracefulShutdown();
//     break;
//   case "EADDRINUSE":
//     console.error(bind + ` is already in use ${errorMsg}`);
//     void shutdown();
//     break;
//   case "EADDRNOTAVAIL":
//     console.error(bind + ` Address not available ${errorMsg}`);
//     void shutdown();
//     break;
//   case "EAFNOSUPPORT":
//     console.error(bind + ` Address family not supported ${errorMsg}`);
//     void shutdown();
//     break;

//   // case "EINVAL":
//   // case "EMFILE":
//   // case "ENFILE":
//   // case "EPIPE":
//   // case "ECONNRESET":

//   default:
//     console.error(`Unhandled server error ${errorMsg}`);
//     void shutdown();
// }