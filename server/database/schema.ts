import { pgTable, serial, text, date, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'
export const roleEnum = pgEnum('roles', ['Admin', 'Standard'])

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').unique().notNull(),
    password: text('password').notNull(),
    email: text('email').unique().notNull(),
    role: roleEnum('role').notNull().default('Standard'),
    birthDate: date('birth_date').notNull(),
    isVerified: boolean('is_verified').notNull().default(false),
    lastLogin: timestamp('last_login', { mode: 'date' }),
    createdOn: timestamp('created_on', { mode: 'date' }).defaultNow()
})

export type NewUser = typeof users.$inferInsert
