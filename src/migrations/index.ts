import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { initDB } from '../database/db';

export async function runMigrations() {


    const db = await initDB()

    const migrationsDir = path.join(__dirname, '');
    const externalDir = path.join(process.cwd(), '/src/database');
    
    const migrationFiles: string[] = [];

    function collectSQLFiles(dir: string) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                collectSQLFiles(fullPath);
            } else if (file.endsWith('.sql')) {
                migrationFiles.push(fullPath);
            }
        });
    }

    if (fs.existsSync(migrationsDir)) {
        collectSQLFiles(migrationsDir);
    } else {
        console.log(`Папка с миграциями ${migrationsDir} не найдена`);
    }

    if (fs.existsSync(externalDir)) {
        collectSQLFiles(externalDir);
    } else {
        console.log(`Папка с миграциями ${externalDir} не найдена`);
    }

    migrationFiles.sort();

    for (const file of migrationFiles) {
        const sql = fs.readFileSync(file, 'utf-8');
        console.log(`Running migration: ${file}`);
        await db.exec(sql);
    }

    await db.close();
}

runMigrations().then((value) => {
    console.log("All migrations sucsessful passed");
}).catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});