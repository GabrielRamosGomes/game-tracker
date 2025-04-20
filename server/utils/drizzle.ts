import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../database/schema";

const pool = new pg.Pool( {
    connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
})

export function useDrizzle() {
    const db = drizzle(pool, { schema })
    return db
}