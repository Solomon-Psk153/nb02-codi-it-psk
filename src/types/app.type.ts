import type { Server as HttpServer } from 'node:http';
// import type { AwilixContainer } from "awilix";
import type { MergedConfigType } from "./config.type";


export type PortValueType = string | number | false;

export type AddressInfoObjectType = {
  address: string;
  family: string;
  port: number;
};

export type ServerAddressType = AddressInfoObjectType | string | null

/**
 * node-cuid
 * @pattern ^c[a-z0-9]+$
 */
export type Cuid = string;

export type StringKeyValueObjectType = {
  [key: string]: string;
};

export type CookieSameSiteType = boolean | "lax" | "none" | "strict" | undefined;

export type createDBInstanceParamsType = {
  dbType: string; 
  dbConfig: Pick<MergedConfigType, "knex" | "env">;
};

export type closeDBInstanceParamsType = {
  // dbType: string;
  dbInstance: unknown;
};

export type ShutdownResourcePropertiesType = {
  name: string;
  close?: () => Promise<void> | void; // async close function if available
};

export type ShutdownOptionsParamsType = {
  server?: HttpServer;
  // resources: 다른 자원들 (db, queue, tracer 등) : 이름 + close 함수
  resources?: ShutdownResourcePropertiesType[];
  timeoutMs?: number;
  // exit codes
  // exitCodeGraceful?: number;   // 정상 종료 코드
  // exitCodeForced?: number;     // 타임아웃 강제 종료 코드
  onShutdown?: (info: { signal: string; reason?: Error }) => void | Promise<void>;
  // container:AwilixContainer<any>;
};

export type ShutdownSequenceReturnType = {
  handleSignal: (signal: string) => () => Promise<void>;
  gracefulShutdown: () => Promise<void>;
}