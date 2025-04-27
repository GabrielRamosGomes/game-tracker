import { pgTable, serial, text, timestamp, integer, boolean, decimal } from 'drizzle-orm/pg-core'

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    aggregated_rating: decimal('aggregated_rating').notNull(),
    rating: decimal('rating').notNull(),
    game_engine: integer('game_engine')
        .notNull()
        .references(() => game_engines.id),
    game_mode: integer('game_mode')
        .notNull()
        .references(() => game_modes.id),
    game_type: integer('game_type')
        .notNull()
        .references(() => game_types.id),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const game_engines = pgTable('game_engines', {
    id: serial('id').primaryKey(),
    logo: text('logo').notNull(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const game_types = pgTable('game_types', {
    id: serial('id').primaryKey(),
    type: text('type').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameType = typeof game_types.$inferInsert

export const game_modes = pgTable('game_modes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameMode = typeof game_modes.$inferInsert

export const genres = pgTable('genres', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGenre = typeof genres.$inferInsert

export const game_genres = pgTable('game_genres', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    genre_id: integer('genre_id')
        .notNull()
        .references(() => genres.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const platforms = pgTable('platforms', {
    id: serial('id').primaryKey(),
    abbreviation: text('abbreviation').notNull(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    platform_type: integer('platform_type')
        .notNull()
        .references(() => platforms_types.id),
    platform_family: integer('platform_family')
        .notNull()
        .references(() => platforms_families.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const platforms_types = pgTable('platforms_types', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const platforms_families = pgTable('platforms_families', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
    country: integer('country')
        .notNull()
        .references(() => countries.id),
    description: text('description').notNull(),
    logo: text('logo').notNull(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    status: integer('status')
        .notNull()
        .references(() => companies_status.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const companies_status = pgTable('company_status', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique()
})
export type NewCompanyStatus = typeof companies_status.$inferInsert

// Code is the ISO 3166-1 code for the country
// Api used to fetch the country list: https://restcountries.com/v3.1/all
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
export const countries = pgTable('countries', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
    code: text('code').unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewCountry = typeof countries.$inferInsert

export const time_to_beat = pgTable('time_to_beat', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    hastily: integer('hastily').notNull(),
    normally: integer('normally').notNull(),
    completely: integer('completely').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const involved_companies = pgTable('involved_companies', {
    id: serial('id').primaryKey(),
    description: text('description').notNull(),
    company_id: integer('company_id')
        .notNull()
        .references(() => companies.id),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    developer: boolean('developer').notNull(),
    publisher: boolean('publisher').notNull(),
    porting: boolean('porting').notNull(),
    supporting: boolean('supporting').notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const player_perspectives = pgTable('player_perspectives', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const game_player_perspectives = pgTable('game_player_perspectives', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    player_perspective_id: integer('player_perspective_id')
        .notNull()
        .references(() => player_perspectives.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const keywords = pgTable('keywords', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewKeyword = typeof keywords.$inferInsert

export const game_keywords = pgTable('game_keywords', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    keyword_id: integer('keyword_id')
        .notNull()
        .references(() => keywords.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})

export const game_engines_games = pgTable('game_engines_games', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    game_engine_id: integer('game_engine_id')
        .notNull()
        .references(() => game_engines.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
