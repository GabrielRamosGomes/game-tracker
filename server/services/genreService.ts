import { BaseService } from './baseService'
import type { NewGenre } from '../database/schema'
import { genres } from '../database/schema'

class GenreService extends BaseService {
    public async insertMany(types: NewGenre[]) {
        return await this.insert(types, this.schema.genres.id)
    }
}

const genreService = new GenreService(genres)

export function useGenreService() {
    return genreService
}
