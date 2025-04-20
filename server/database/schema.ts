import { pgTable, serial, text, date, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const games = pgTable('games', {})

export const game_engines = pgTable('game_engines', {})

export const game_types = pgTable('game_types', {})

export const genres = pgTable('genres', {})

export const platforms = pgTable('platforms', {})

export const companies = pgTable('companies', {})

export const time_to_beat = pgTable('time_to_beat', {})


