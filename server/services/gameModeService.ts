import { BaseService } from './baseService'
import type { NewGameMode } from '../database/schema'
import { game_modes } from '../database/schema'

class GameModeSerivce extends BaseService {
    public async insertMany(modes: NewGameMode[]) {
        return await this.insert(modes, this.schema.game_modes.id)
    }
}

const gameModeService = new GameModeSerivce(game_modes)

export function useGameModeService() {
    return gameModeService
}
