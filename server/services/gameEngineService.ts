import { BaseService } from './baseService'
import { game_engines } from '../database/schema'

class GameEnginesService extends BaseService<typeof game_engines> {}

export const gameEngines = new GameEnginesService(game_engines, game_engines.id)
