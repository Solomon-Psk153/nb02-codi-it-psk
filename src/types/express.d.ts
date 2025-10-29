import 'express';
import type { AwilixContainer } from 'awilix';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<UserDBType, "id", "type">;
      scope: AwilixContainer;
    }
  }
}
