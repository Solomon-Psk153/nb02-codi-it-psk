import { z } from 'zod';
import { merge } from 'lodash';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import defaultAppCfg from '@_configs/default';
import devAppCfg from '@_configs/development';
import prodAppCfg from '@_configs/production';
import testAppCfg from "@_configs/test";
import { envSchema } from "@_configs/schemas/env.schema";
import { appSchema } from '@_configs/schemas/app.schema';
import { pgSchema } from '@_configs/schemas/pg.schema';

dotenvExpand.expand(dotenv.config({ path: path.resolve(__dirname, "../envs/.env") }));

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error('Missing or invalid env vars', z.treeifyError(parsedEnv.error));
  console.log(parsedEnv);
  throw new Error('Invalid environment variables'); // 시그널로 교체하기
}

// 2) env -> 적절한 타입 변환(예: PORT string -> number)
const passedEnv = parsedEnv.data;

// 3) env, 환경에 따른 설정을 병합(merge)한다.
const NODE_ENV = passedEnv.NODE_ENV;
const nodeEnvSpecificAppCfg = NODE_ENV === 'production' ? prodAppCfg : (NODE_ENV === 'test' ? testAppCfg : devAppCfg);

const appEnv = {
  env: {
    app: { 
      port: Number(passedEnv.PORT),
      nodeEnv: NODE_ENV,
    },
  
    db:{
      type: passedEnv.DB_TYPE,
      name: passedEnv.DB_NAME,
      pg: {
        connection: passedEnv.PG_CONNECTION,
        createConnection: passedEnv.PG_CONNECTION4CREATE,
      },
    },
  
    secrets: { 
      jwtAccess: passedEnv.JWT_ACCESS_TOKEN_SECRET,
      jwtRefresh: passedEnv.JWT_REFRESH_TOKEN_SECRET,
      cookie: passedEnv.COOKIE_SECRET,
      cuidFingerPrint: passedEnv.FINGERPRINT,
    },
  }
};

const mergedCfg = merge({}, defaultAppCfg, nodeEnvSpecificAppCfg, appEnv);

// 4) 병합된 결과를 모듈 별로 검증
const appParsed = appSchema.safeParse(mergedCfg);
if(!appParsed.success){
  console.log(appParsed, mergedCfg.app);
  throw new Error("Invalid app config");
}

const pgParsed = pgSchema.safeParse(mergedCfg);
if(!pgParsed.success) {
  console.log(pgParsed);
  throw new Error("Invalid pg config");
}

// 교차검증(cross-field validation)
const pg = pgParsed.data.knex.pg;
if (pg.pool.max < pg.pool.min) throw new Error('pool max < min');
if (NODE_ENV === 'production' && pg.debug) throw new Error('debug true in prod');

export default mergedCfg;