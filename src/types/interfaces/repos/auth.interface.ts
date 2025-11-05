import type { QueryUserByEmailObjectType } from "@_types/user.type";

export interface IAuthRepo {
  findByEmail(email: string): Promise<QueryUserByEmailObjectType | null>;
  
}