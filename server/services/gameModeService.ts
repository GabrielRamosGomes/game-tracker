import { BaseService } from './baseService'
import type { NewGameMode } from '../database/schema'
import { game_modes } from '../database/schema'

class GameModeService extends BaseService {
    public async insertMany(modes: NewGameMode[]) {
        return await this.insert(modes, game_modes.id)
    }
}

const gameModeService = new GameModeService(game_modes)

export function useGameModeService() {
    return gameModeService
}
