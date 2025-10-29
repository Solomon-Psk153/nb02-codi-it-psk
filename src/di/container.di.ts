import path from 'path';
import { createContainer, asValue, asClass, asFunction, Lifetime, InjectionMode } from 'awilix';
import { knex, type Knex } from 'knex';
import { closeDBInstance, returnDBConfig } from '@_app/utils/util.app.db';

import { createCuid, omit } from '@_utils/app.util';

import type { AwilixContainer } from 'awilix';
import type { ContainerSetParamType } from '@_types/di.type';

export async function createDiContainer({ config }: ContainerSetParamType): Promise<AwilixContainer> {

  // console.log('getContainer type:', typeof getContainer);
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
    strict: true,
  });

  // config: 전체를 등록해도 되지만 민감 정보 최소화가 목표라면 필요한 부분만 노출
  // DB 등록: factory로 감싼 뒤 singleton + disposer로 안전히 닫기
  container.register({
    idGen: asValue(createCuid), // .transient()
    cfg: asValue(config),
    db: asFunction<Knex>(() => {
      const dbType = config.env.db.type;
      return knex(returnDBConfig({ dbType, dbConfig: omit(config, "app") })); 
    }).singleton().disposer(async (dbInstance: Knex) => {
      // const dbType = config.env.db.type;
      await closeDBInstance({ dbInstance });
    }),
  });

  const servicesGlob = path.join(__dirname, '..', 'mvc', 'services', '**', '*.{ts,js}');
  const reposGlob = path.join(__dirname, '..', 'mvc', 'repos', '**', '*.{ts,js}');

  await container.loadModules(
    [
      [ servicesGlob, { register: asClass, lifetime: Lifetime.SINGLETON } ],
      [ reposGlob, { register: asClass, lifetime: Lifetime.SINGLETON } ],
    ],

    {
      formatName: 'camelCase',
      resolverOptions: {
        register: asClass,
        lifetime: Lifetime.SINGLETON,
      },
    }
  );

  return container;
}

let _container: AwilixContainer | null = null;

export const initDI = async (opts: ContainerSetParamType): Promise<AwilixContainer> => {
  if (_container) return _container;
  _container = await createDiContainer(opts);
  return _container;
};

/** 앱 어디서나 컨테이너를 꺼낼 수 있게 함(초기화 전에 호출하면 에러) */
export const getContainer = (): AwilixContainer => {
  if (!_container) throw new Error('DI container is not initialized. Call initDI first.');
  return _container;
};