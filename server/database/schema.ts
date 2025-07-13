import { pgTable, serial, text, timestamp, integer, boolean, decimal } from 'drizzle-orm/pg-core'

export const games = pgTable('games', {
    id: serial('id').primaryKey(),
    aggregated_rating: decimal('aggregated_rating'),
    rating: decimal('rating'),
    first_release_date: timestamp('first_release_date'),
    storyline: text('storyline'),
    game_type: integer('game_type')
        .notNull()
        .references(() => game_types.id),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGame = typeof games.$inferInsert

export const game_engines = pgTable('game_engines', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameEngine = typeof game_engines.$inferInsert

export const game_types = pgTable('game_types', {
    id: serial('id').primaryKey(),
    type: text('type').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameType = typeof game_types.$inferInsert

export const game_modes = pgTable('game_modes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameMode = typeof game_modes.$inferInsert

export const game_modes_games = pgTable('game_modes_games', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    game_mode_id: integer('game_mode_id')
        .notNull()
        .references(() => game_modes.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameModeGame = typeof game_modes_games.$inferInsert

export const genres = pgTable('genres', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
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
export type NewGameGenre = typeof game_genres.$inferInsert

export const platforms = pgTable('platforms', {
    id: serial('id').primaryKey(),
    abbreviation: text('abbreviation'),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    platform_type: integer('platform_type').references(() => platform_types.id),
    platform_family: integer('platform_family').references(() => platform_families.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewPlatform = typeof platforms.$inferInsert

export const platform_types = pgTable('platform_types', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewPlatformType = typeof platform_types.$inferInsert

export const platform_families = pgTable('platform_families', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewPlatformFamily = typeof platform_families.$inferInsert

export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
    country: integer('country').references(() => countries.code),
    description: text('description'),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    status: integer('status').references(() => companies_status.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewCompany = typeof companies.$inferInsert

export const companies_status = pgTable('company_status', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewCompanyStatus = typeof companies_status.$inferInsert

// Code is the ISO 3166-1 code for the country
// Api used to fetch the country list: https://restcountries.com/v3.1/all
// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
export const countries = pgTable('countries', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
    code: integer('code').unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewCountry = typeof countries.$inferInsert

export const time_to_beat = pgTable('time_to_beat', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    hastily: integer('hastily'),
    normally: integer('normally'),
    completely: integer('completely'),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewTimeToBeat = typeof time_to_beat.$inferInsert

export const involved_companies = pgTable('involved_companies', {
    id: serial('id').primaryKey(),
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
export type NewInvolvedCompany = typeof involved_companies.$inferInsert

export const player_perspectives = pgTable('player_perspectives', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewPlayerPerspective = typeof player_perspectives.$inferInsert

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
export type NewGamePlayerPerspective = typeof game_player_perspectives.$inferInsert

export const keywords = pgTable('keywords', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
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
export type NewGameKeyword = typeof game_keywords.$inferInsert

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
export type NewGameEngineGame = typeof game_engines_games.$inferInsert

export const themes = pgTable('themes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewTheme = typeof themes.$inferInsert

export const game_themes = pgTable('game_themes', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    theme_id: integer('theme_id')
        .notNull()
        .references(() => themes.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGameTheme = typeof game_themes.$inferInsert

export const game_platforms = pgTable('game_platforms', {
    id: serial('id').primaryKey(),
    game_id: integer('game_id')
        .notNull()
        .references(() => games.id),
    platform_id: integer('platform_id')
        .notNull()
        .references(() => platforms.id),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    created_at: timestamp('created_at').defaultNow().notNull()
})
export type NewGamePlatform = typeof game_platforms.$inferInsert
