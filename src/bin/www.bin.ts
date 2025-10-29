import { bootstrap } from "@_app/bootstrap.app";

bootstrap()
  .then(() => console.log('Server started'))
  .catch((err) => {
    console.error('bootstrap failed', err);
    process.exit(1);
  });