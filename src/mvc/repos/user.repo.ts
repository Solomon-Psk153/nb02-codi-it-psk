import { hashingWithSalt, omit } from "@_utils/app.util";

import type { Knex } from "knex";
import type { IUserRepo } from "@_IFs/repos/user.interface";
import type { KnexDBInstance4ClassType, UserDBObjectType } from "@_types/knex.type";
import type { GradeRestructedDBObjectType, PostUserRegisterRequestObjectType, UserRestructedDBObjectType } from "@_types/user.type";
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
  public async createUser({ name, email, password, type }: PostUserRegisterRequestObjectType): Promise<UserRestructedDBObjectType> {
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

  static [RESOLVER] = {
    name: 'UserRepo'
  }
};