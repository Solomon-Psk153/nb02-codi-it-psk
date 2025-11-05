import { hashingWithSalt, omit } from "@_utils/app.util";

import type { Knex } from "knex";
import type { IUserRepo } from "@_IFs/repos/user.interface";
import type { KnexDBInstance4ClassType, UserDBObjectType } from "@_types/knex.type";
import type { GradeRestructedDBObjectType, PostFindUserInfoParamType, PostRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";
import { RESOLVER } from "awilix";

export class UserRepo implements IUserRepo {
  private db;
  private idGen;
  constructor(
    {db, idGen}: {
      db: KnexDBInstance4ClassType;
      idGen: () => string;
    }
  ) {
    this.db = db;
    this.idGen = idGen;
  }
  public async createUser({ name, email, password, type }: PostRegisterRequestObjectType): Promise<UserRestructedDBObjectType> {
    // row
    return await this.db.transaction(async (trx: Knex.Transaction) => {
      const greenGradeId = (await this.db.select("id").from("grades").where({name: "Green"}).first<GradeRestructedDBObjectType>()).id;

      // userRow
      const [u] = await trx.insert({
        id: this.idGen(),
        name,
        email,
        password: await hashingWithSalt(password),
        type,
        grade_id: greenGradeId,
      })
        .into<UserDBObjectType>("users")
        .returning("*");

      // greenGradeRow
      const g = await trx.select("*").from("grades").where({ id: greenGradeId }).first<GradeRestructedDBObjectType>();

      return {
        ...omit(u, "image_url", "grade_id"),
        grade: g,
        image: u.image_url
      };
    });
  }

  public async findByIdAndType({id, type}: PostFindUserInfoParamType): Promise<UserRestructedDBObjectType>{
    return await this.db.transaction(async (trx: Knex.Transaction) => {

      const currentUserObj = await trx.select("*").from("users").where({id, type}).first<UserDBObjectType>();
      const g = await trx.select("*").from("grades").where({ id: currentUserObj.grade_id }).first<GradeRestructedDBObjectType>();

      return {
        ...omit(currentUserObj, "image_url", "grade_id"),
        grade: g,
        image: currentUserObj.image_url
      };
    });
  }

  static [RESOLVER] = {
    name: 'UserRepo'
  }
};