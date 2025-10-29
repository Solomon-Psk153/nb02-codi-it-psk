import type { QueryUserByEmailObjectType, QueryUserJoinWithGradeKnexObjectType } from "@_types/user.type";
import type { IAuthRepo } from "@_IFs/repos/auth.interface";
import type { KnexDBInstance4ClassType } from "@_types/knex.type";
import { RESOLVER } from "awilix";

export class AuthRepo implements IAuthRepo {
  private db;
  constructor(
    {db}: {db : KnexDBInstance4ClassType}
  ) {
    this.db = db;
  };
  public async findByEmail(email: string): Promise<QueryUserByEmailObjectType | null> {

    const row = await this.db.select<QueryUserJoinWithGradeKnexObjectType>(
      "u.id as id",
      "u.email as email",
      "u.password as password",
      "u.name as name",
      "u.points as points",
      "u.image_url as image_url",
      "g.id as grade_id",
      "g.name as grade_name",
      "g.rate as grade_rate",
      "g.min_amount as grade_min_amount"
    )
      .from("users as u")
      .join("grades as g", "u.grade_id", "g.id")
      .where("u.email", email)
      .first<QueryUserJoinWithGradeKnexObjectType | undefined>();

    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      password: row.password,
      name: row.name,
      type: row.type,
      points: row.points,
      image: row.image_url,
      grade: {
        id: row.grade_id,
        name: row.grade_name,
        rate: row.grade_rate,
        minAmount: row.grade_min_amount
      }
    };
  }

  static [RESOLVER] = {
    name: 'AuthRepo'
  }
};

// const row = await db("users")
//   .join("grades", "users.grade_id", "grades.id")
//   .where("users.email", email)
//   .select(db.raw(`
//     json_build_object(
//       'id', users.id,
//       'email', users.email,
//       'name', users.name,
//       'type', users.type,
//       'points', users.points,
//       'image', users.image_url,
//       'grade', json_build_object(
//         'id', grades.id,
//         'name', grades.name,
//         'rate', grades.rate,
//         'minAmount', grades.min_amount
//       )
//     ) as user
//   `)
// ).first<{user: UserByEmailObjectType}>();