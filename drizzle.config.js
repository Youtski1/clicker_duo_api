"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: 'postgresql',
    schema: './src/database/models',
    out: "./drizzle",
    dbCredentials: {
        url: "postgresql+psycopg://postgres:25814@85.198.83.226:5432/clicker_duo_production"
    },
});
