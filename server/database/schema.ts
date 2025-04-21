import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
})

export const game_engines = pgTable('game_engines', {
    id: serial('id').primaryKey(),
})

export const game_types = pgTable('game_types', {
    id: serial('id').primaryKey(),
    type: text('type').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const genres = pgTable('genres', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    url: text('url').notNull(),
})

export const platforms = pgTable('platforms', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    platformType: integer('platform_type').notNull().references(() => platforms_types.id),
    platformFamily: integer('platform_family').notNull().references(() => platforms_families.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const platforms_types = pgTable('platforms_types', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

export const platforms_families = pgTable('platforms_families', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
});

export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
})

export const games_developed_by_companies = pgTable('games_by_companies', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    company_id: integer('company_id').notNull().references(() => companies.id),
});

export const games_published_by_companies = pgTable('games_published_by_companies', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    company_id: integer('company_id').notNull().references(() => companies.id),
});

export const time_to_beat = pgTable('time_to_beat', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    hastily: integer('hastily').notNull(),
    normally: integer('normally').notNull(),
    completely: integer('leisurely').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})


