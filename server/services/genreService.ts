import { BaseService } from './baseService'
import { genres, game_genres } from '../database/schema'
import type { NewGameGenre } from '../database/schema'

class GameGenreService extends BaseService<typeof game_genres> {}
const gameGenreService = new GameGenreService(game_genres, game_genres.id)

class GenreService extends BaseService<typeof genres> {
    public async insertGameGenres(data: NewGameGenre[]) {
        const records = await gameGenreService.bulkInsert(data)
        console.log(`Inserted ${records} game genres into the database`)
        return records;
    }
}

export const genreService = new GenreService(genres, genres.id)
