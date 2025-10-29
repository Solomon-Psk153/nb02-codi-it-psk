import { Knex } from "knex";
import { Cuid } from "./app.type";

/**
 * DB에서 users의 스키마 구조
 */
export type UserDBObjectType = {
  id: Cuid;
  name: string;
  email: string;
  password: string;
  type: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  image_url?: string;
  grade_id: string;
};

/**
 * DB에서 grades의 스키마 구조
 */
export type GradeDBObjectType = {
  id: Cuid;
  name: string;
  rate: number;
  min_amount: number;
}

export type KnexDBInstance4ClassType = Knex | Knex.Transaction;