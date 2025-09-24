import knex from "knex";
import config from "../../knex/config/knexfile";

export const db = knex(config);

export const onUpdateTrigger = (table: string) => `
CREATE TRIGGER ${table}_updated_at
BEFORE UPDATE ON ${table}
FOR EACH ROW
EXECUTE PROCEDURE on_update_timestamp();
`;