import { Database } from "sqlite";
import  sqlite3 from "sqlite3";
import { initDB } from "../database/db";


class BaseService {

    db!: Database<sqlite3.Database, sqlite3.Statement>;

    constructor(database: Database<sqlite3.Database, sqlite3.Statement>) {
        this.db = database;
    };
    
};


export default BaseService;