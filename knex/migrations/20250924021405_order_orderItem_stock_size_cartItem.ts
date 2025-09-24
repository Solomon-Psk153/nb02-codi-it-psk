import type { Knex } from "knex";
import { onUpdateTrigger } from "../../src/utils/knex.util";
import { createOrdersTable } from "../models/orders.model";
import { createOrderItemsTable } from "../models/order-items.model";
import { createSizeInfoTable } from "../models/size-info.model";
import { createSizesTable } from "../models/sizes.model";
import { createStocksTable } from "../models/stocks.model";
import { createCartItemsTable } from "../models/cart-items.model";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("orders", createOrdersTable);
  await knex.raw(onUpdateTrigger("orders"));

  await knex.schema.createTable("order_items", createOrderItemsTable);

  await knex.schema.createTable("size_info", createSizeInfoTable);
  await knex.schema.createTable("sizes", createSizesTable);
  await knex.schema.createTable("stocks", createStocksTable);

  await knex.schema.createTable("cart_items", createCartItemsTable);
  await knex.raw(onUpdateTrigger("cart_items"));
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("cart_items");
  await knex.schema.dropTableIfExists("size_info");
  await knex.schema.dropTableIfExists("sizes");
  await knex.schema.dropTableIfExists("stocks");
  await knex.schema.dropTableIfExists("order_items");
  await knex.schema.dropTableIfExists("orders");
}

