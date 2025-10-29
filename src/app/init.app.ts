import "reflect-metadata";
import createError from 'http-errors';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import actuator from 'express-actuator';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@_mws/errorHandler';
import { RegisterRoutes } from "@_routes/tsoa.route"; // tsoa가 생성한 파일

import { asValue, type AwilixContainer } from "awilix";
import { cookieSecret } from "@_consts/env.consts";

export async function createApp({container} : {container: AwilixContainer}) {
  const app = express();

  app.use((req, _res, next) => {
    req.scope = container.createScope();
    req.scope.register({currentUser: asValue(req.user)});
    next();
  });

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser(cookieSecret)); // config.secrets.cookie
  app.use(morgan('dev'));
  app.use(actuator());
  app.use(helmet());

  RegisterRoutes(app);

  app.use(((_req, _res, next) => {
    next(createError(404));
  }) as RequestHandler);

  app.use(errorHandler);

  return app;
}