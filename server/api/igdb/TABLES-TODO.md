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

- [ ] game_engines_games (needs games, game_engines)
- [x] game_genres (needs games, genres)
- [ ] game_keywords (needs games, keywords)
- [ ] game_player_perspectives (needs games, player_perspectives)
- [ ] game_platforms (needs games, platforms)
- [x] game_themes (needs games, themes)
- [x] game_modes_games (needs games, game_modes)
- [ ] involved_companies (needs companies, games)

### Insert Extras

- [ ] time_to_beat (needs games)

### Backup files
1.5-phase-backup - Contains all data from independent tables and dependent tables + game_genres, game_themes, game_modes_games from the link tables.

