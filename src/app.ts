import createError from 'http-errors';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import actuator from 'express-actuator';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(actuator());
app.use(helmet());

app.use(((_req, _res, next) => {
  next(createError(404));
}) as RequestHandler);

app.use(errorHandler);

export default app;