import { z } from "zod";

const nodeEnvs = ["development", "production", "test"];

export const envSchema = z.object({
  NODE_ENV: z.enum(nodeEnvs).default(nodeEnvs[0]),
  PORT: z.union([z.string().nonempty(), z.preprocess((v) => Number(v), z.number().int().positive())]),

  DB_TYPE: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),

  PG_CONNECTION4CREATE: z.string().nonempty(),
  PG_CONNECTION: z.string().nonempty(),

  FINGERPRINT: z.string().nonempty(),
  JWT_ACCESS_TOKEN_SECRET: z.string().nonempty(),
  JWT_REFRESH_TOKEN_SECRET: z.string().nonempty(),
  COOKIE_SECRET: z.string().nonempty(),
});

export type EnvSchemaType = z.infer<typeof envSchema>;