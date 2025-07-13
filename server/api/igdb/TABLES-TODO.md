## Database Seeding Order

### Insert Independent Tables

- [x] countries
- [x] company_status
- [x] game_modes
- [x] game_types
- [x] genres
- [x] keywords
- [x] platform_families
- [x] platform_types
- [x] player_perspectives
- [x] themes

### Insert Dependent Tables

- [x] companies (needs countries, company_status)
- [x] platforms (needs platform_families, platform_types)
- [x] game_engines
- [x] games (needs game_engines, game_modes, game_types)

### Insert Link (Many-to-Many) Tables

- [x] game_engines_games (needs games, game_engines)
- [x] game_genres (needs games, genres)
- [x] game_keywords (needs games, keywords)
- [x] game_player_perspectives (needs games, player_perspectives)
- [x] game_platforms (needs games, platforms)
- [x] game_themes (needs games, themes)
- [x] game_modes_games (needs games, game_modes)
- [ ] involved_companies (needs companies, games)

### Insert Extras

- [ ] time_to_beat (needs games)

### Backup files
1.5-phase-backup - Contains all data from independent tables and dependent tables + all many-to-many tables from games table.

