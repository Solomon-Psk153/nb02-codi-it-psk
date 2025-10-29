/**
 * 서버가 Error를 줄 때 json 구조
 */
export type ErrorResponseObjectType = {
  status: number;
  message: string;
  error: string;
}

export interface pgErrorResponseObjectType extends Error {
  code: string; // SQLSTATE, e.g. '23505'
  detail?: string;
  constraint?: string;
  table?: string;
  column?: string;
};

export interface MysqlErrorResponseObjectType extends Error {
  code?: string; // e.g. 'ER_DUP_ENTRY'
  errno?: number; // e.g. 1062
  sqlMessage?: string;
}