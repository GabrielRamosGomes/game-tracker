import { BaseService } from './baseService'
import { genres } from '../database/schema'

class GenreService extends BaseService<typeof genres> {}

export const genreService = new GenreService(genres, genres.id)
