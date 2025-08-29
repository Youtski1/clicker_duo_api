import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres"
import * as dotenv from 'dotenv';


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool(
  { 
    connectionString: DATABASE_URL
  }
);

const db = drizzle({
  client: pool
});


export default db;