import { returnDB4CreateConfig } from "@_app/utils/util.app.db";
import config from "@_configs/index";
import { omit } from "@_utils/app.util";

export default returnDB4CreateConfig({dbType: config.env.db.type, dbConfig: omit(config, "app")});
