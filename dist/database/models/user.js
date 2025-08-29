"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const User = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    telegram_id: (0, pg_core_1.bigint)('telegram_id', { mode: "number" }).notNull(),
    full_name: (0, pg_core_1.text)('full_name'),
    username: (0, pg_core_1.text)('username'),
    feathers: (0, pg_core_1.integer)('feathers').default(0).notNull(),
    damage: (0, pg_core_1.integer)('damage').default(1).notNull()
});
exports.default = User;
