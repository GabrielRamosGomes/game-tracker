import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const game_engines = pgTable('game_engines', {
    id: serial('id').primaryKey(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const game_types = pgTable('game_types', {
    id: serial('id').primaryKey(),
    type: text('type').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const game_modes = pgTable('game_modes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const genres = pgTable('genres', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    url: text('url').notNull(),
})

export const platforms = pgTable('platforms', {
    id: serial('id').primaryKey(),
    abbreviation: text('abbreviation').notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),   
    platformType: integer('platform_type').notNull().references(() => platforms_types.id),
    platformFamily: integer('platform_family').notNull().references(() => platforms_families.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const platforms_types = pgTable('platforms_types', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const platforms_families = pgTable('platforms_families', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
})

export const games_developed_by_companies = pgTable('games_by_companies', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    company_id: integer('company_id').notNull().references(() => companies.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export const games_published_by_companies = pgTable('games_published_by_companies', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    company_id: integer('company_id').notNull().references(() => companies.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export const time_to_beat = pgTable('time_to_beat', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    hastily: integer('hastily').notNull(),
    normally: integer('normally').notNull(),
    completely: integer('leisurely').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const involved_companies = pgTable('involved_companies', {
    id: serial('id').primaryKey(),
    description: text('description').notNull(),
    company_id: integer('company_id').notNull().references(() => companies.id),
    game_id: integer('game_id').notNull().references(() => games.id),
    developer: boolean('developer').notNull(),
    publisher: boolean('publisher').notNull(),
    porting: boolean('porting').notNull(),
    supporting: boolean('supporting').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export const player_perspectives = pgTable('player_perspectives', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const keywords = pgTable('keywords', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const game_keywords = pgTable('game_keywords', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id').notNull().references(() => games.id),
    keyword_id: integer('keyword_id').notNull().references(() => keywords.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})
