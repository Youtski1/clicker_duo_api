import { pgTable, serial , integer, bigint, timestamp } from "drizzle-orm/pg-core";


const Duo = pgTable('duos', {
    id: serial('id').primaryKey().notNull(),
    owner_id: bigint('owner_id', {mode: "number"}).notNull(),
    level: integer('level').default(1).notNull(),
    stage: integer('stage').default(1).notNull(),
    health: integer('health').default(1200).notNull(),
    recovery_time: timestamp('recovery_time')

})

export default Duo;