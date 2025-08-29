import { pgTable, serial, integer, text, bigint} from "drizzle-orm/pg-core";

const User = pgTable("users", {
    id: serial('id').primaryKey().notNull(),
    telegram_id: bigint('telegram_id', {mode: "number"}).notNull(),
    full_name: text('full_name'),
    username: text('username'),
    feathers: integer('feathers').default(0).notNull(),
    damage: integer('damage').default(1).notNull()
});


export default User;