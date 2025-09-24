import { InternalServerError } from "./error/500.error";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import path from "path";

dotenvExpand.expand(dotenv.config({ path: path.resolve(__dirname, "../../.env") }));

export const envVerify = (value: string) => {
  const env = process.env[value];
  if (env == null) {
    throw new InternalServerError(`env not found`);
  }
  return env;
};