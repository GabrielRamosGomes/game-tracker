import { BaseService } from './baseService'
import type { NewGenre } from '../database/schema'
import { genres } from '../database/schema'

class GenreService extends BaseService<typeof genres> {
    public async insertMany(types: NewGenre[]) {
        return await this.insert(types, genres.id)
    }
}

export const genreService = new GenreService(genres)
