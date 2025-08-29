import db from "../../database/db";

export class Repository {
    db: typeof db;

    constructor(database: typeof db) {
        this.db = database;
    }
}

export default Repository;