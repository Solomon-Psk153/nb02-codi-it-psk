import { mapDBError } from "@_utils/error.util";

export const repoDBErrorCatcher = async<T> (f: () => Promise<T>):Promise<T> => {
  try {
    return await f();
  } catch (err: unknown) {
    const mapped = mapDBError(err);
    if (mapped) throw mapped;

    console.log(err);
    throw err;
  }
}