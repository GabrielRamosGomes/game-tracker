import { BaseService } from './baseService'
import { games } from '../database/schema'

class GameService extends BaseService<typeof games> {}

export const gameService = new GameService(games, games.id)
