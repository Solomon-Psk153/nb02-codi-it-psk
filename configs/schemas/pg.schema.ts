import { z } from "zod";

export const pgSchema = z.object({
  knex: z.object({
    pg: z.object({
      client: z.literal("pg"),
      pool: z.object({
        min: z.number().int().nonnegative(),
        max: z.number().int().positive()
      }),
      debug: z.boolean(),
      asyncStackTraces: z.boolean(),
      compileSqlOnError: z.boolean()
    })
  })
});

export type pgSchemaType = z.infer<typeof pgSchema>;