import { BaseService } from './baseService'
import { game_types } from '../database/schema'

class GameTypeService extends BaseService<typeof game_types> {}

export const gameTypeService = new GameTypeService(game_types, game_types.id)
