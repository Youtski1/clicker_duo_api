import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql', 
  schema: './src/database/models',
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql+psycopg://postgres:25814@85.198.83.226:5432/clicker_duo_production"
  },
})