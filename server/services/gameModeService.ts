import { BaseService } from './baseService'
import { game_modes } from '../database/schema'

class GameModeService extends BaseService<typeof game_modes> {}

export const gameModeService = new GameModeService(game_modes, game_modes.id)
