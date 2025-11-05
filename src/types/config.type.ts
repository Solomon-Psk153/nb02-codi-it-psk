import mergedCfg from "@_configs/index";

export type MergedConfigType = typeof mergedCfg;
export type RequestUserConfigType = {
  id:string;
  type:string;
};