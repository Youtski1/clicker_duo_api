"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../database/db");
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, db_1.initDB)();
        const migrationsDir = path_1.default.join(__dirname, '');
        const externalDir = path_1.default.join(process.cwd(), '/src/database');
        const migrationFiles = [];
        function collectSQLFiles(dir) {
            const files = fs_1.default.readdirSync(dir);
            files.forEach(file => {
                const fullPath = path_1.default.join(dir, file);
                const stat = fs_1.default.statSync(fullPath);
                if (stat.isDirectory()) {
                    collectSQLFiles(fullPath);
                }
                else if (file.endsWith('.sql')) {
                    migrationFiles.push(fullPath);
                }
            });
        }
        if (fs_1.default.existsSync(migrationsDir)) {
            collectSQLFiles(migrationsDir);
        }
        else {
            console.log(`Папка с миграциями ${migrationsDir} не найдена`);
        }
        if (fs_1.default.existsSync(externalDir)) {
            collectSQLFiles(externalDir);
        }
        else {
            console.log(`Папка с миграциями ${externalDir} не найдена`);
        }
        migrationFiles.sort();
        for (const file of migrationFiles) {
            const sql = fs_1.default.readFileSync(file, 'utf-8');
            console.log(`Running migration: ${file}`);
            yield db.exec(sql);
        }
        yield db.close();
    });
}
runMigrations().then((value) => {
    console.log("All migrations sucsessful passed");
}).catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
