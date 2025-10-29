import config from "@_configs/index";

export const jwtAccessSecret = config.env.secrets.jwtAccess;
export const jwtRefreshSecret = config.env.secrets.jwtRefresh;
export const cuidFingerPrint = config.env.secrets.cuidFingerPrint;
export const cookieSecret = config.env.secrets.cookie;