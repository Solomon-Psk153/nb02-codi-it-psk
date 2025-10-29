import { z } from "zod";
import { GradeDBObjectType, UserDBObjectType } from "./knex.type";
import { userRegisterSchema } from "@_validators/requests/user.validator";

/**
 * ```json
 * {
 *   id: Cuid;
 *   name: string;
 *   email: string;
 *   password: string;
 *   type: string;
 *   points: number;
 *   createdAt: string;
 *   updatedAt: string;
 *   grade: {
 *     id: string;
 *     name: string;
 *     rate: number;
 *     minAmount: number;
 *   };
 *   image: string;
 * }
 * ```
 */
export type UserRestructedDBObjectType = Omit<UserDBObjectType, "grade_id" | "image_url"> & {
  image?: string;
  grade: GradeRestructedDBObjectType;
};
/**
 * ```json
 * {
 *   id: Cuid;
 *   name: string;
 *   email: string;
 *   password: string;
 *   type: string;
 *   points: number;
 *   grade: {
 *     id: string;
 *     name: string;
 *     rate: number;
 *     minAmount: number;
 *   };
 *   image: string;
 * }
 * ```
 */
export type QueryUserByEmailObjectType = Omit<UserRestructedDBObjectType, "createdAt" | "updatedAt">

export type QueryUserJoinWithGradeKnexObjectType = {
  id: string;
  email: string;
  password: string;
  name: string;
  type: string;
  points: number;
  image_url?: string;
  grade_id: string;
  grade_name: string;
  grade_rate: number;
  grade_min_amount: number;
};

/**
 *```json
 *{
 *  id: string;
 *  name: string;
 *  rate: number;
 *  minAmount: number;
 *};
 * ```
 */
export type GradeRestructedDBObjectType = Omit<GradeDBObjectType, "min_amount"> & { minAmount: number; };

/**
 * {
 *   name: string;
 *   email: string;
 *   password: string;
 *   type: "SELLER" | "BUYER";
 * }
 */
export type PostUserRegisterRequestObjectType = z.infer<typeof userRegisterSchema>