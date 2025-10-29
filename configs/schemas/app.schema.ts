import { z } from 'zod';

export const appSchema = z.object({
  app: z.object({
    logLevel: z.enum(['debug', 'info', 'warn', 'error']),
    cookie: z.object({
      httpOnly: z.boolean(),
      sameSite: z.union([
        z.boolean(),
        z.literal('lax'),
        z.literal('strict'),
        z.literal('none'),
      ]).optional(),
      secure: z.boolean(),
      maxAge: z.int(),
      signed: z.boolean(),
    })
  })
});

export type AppSchemaType = z.infer<typeof appSchema>;
