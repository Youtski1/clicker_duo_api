"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const Duo = (0, pg_core_1.pgTable)('duos', {
    id: (0, pg_core_1.serial)('id').primaryKey().notNull(),
    owner_id: (0, pg_core_1.bigint)('owner_id', { mode: "number" }).notNull(),
    level: (0, pg_core_1.integer)('level').default(1).notNull(),
    stage: (0, pg_core_1.integer)('stage').default(1).notNull(),
    health: (0, pg_core_1.integer)('health').default(1200).notNull(),
    recovery_time: (0, pg_core_1.timestamp)('recovery_time')
});
exports.default = Duo;
