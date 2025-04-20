import { pgTable, serial, text, date, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'
export const roleEnum = pgEnum('roles', ['Admin', 'Standard'])

