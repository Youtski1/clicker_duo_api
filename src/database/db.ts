import { open } from "sqlite";
import sqlite3 from "sqlite3";


export async function initDB() {
    return await open({
        filename: 'database.db',
        driver: sqlite3.Database,
      });
}
