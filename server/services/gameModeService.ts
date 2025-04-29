import { BaseService } from './baseService'
import type { NewGameMode } from '../database/schema'
import { game_modes } from '../database/schema'

class GameModeService extends BaseService<typeof game_modes> {
    public async insertMany(modes: NewGameMode[]) {
        return await this.insert(modes, game_modes.id)
    }
}

export const gameModeService = new GameModeService(game_modes, game_modes.id)
