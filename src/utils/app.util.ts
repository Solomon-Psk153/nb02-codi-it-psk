import { init } from "@paralleldrive/cuid2";
import bcrypt from "bcrypt";
import { cuidFingerPrint } from "@_consts/env.consts";
import mathRandom from "math-random";

export const createCuid = init({
  random: mathRandom,// () => crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff,
  length: 25,
  fingerprint: cuidFingerPrint
});

export const hashingWithSalt = async (str: string) => await bcrypt.hash(str, 10);
export const strAndHashCompare = async(str: string, hash: string) => await bcrypt.compare(str, hash);

const o = Object;
export const filterObj = (obj:object, f:Function) => o.fromEntries(o.entries(obj).filter(k => f(k)));
export const pick = <T extends object, K extends keyof T>(obj:T, ...props:K[]):Pick<T,K> => filterObj(obj, (k:K) => props.includes(k)) as Pick<T,K>;
export const omit = <T extends object, K extends keyof T>(obj:T, ...props:K[]):Omit<T,K> => filterObj(obj, (k:K) => !props.includes(k)) as Omit<T,K>;