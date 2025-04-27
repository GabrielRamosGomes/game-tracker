import { BaseService } from './baseService'
import type { NewGameMode } from '../database/schema'

class GameModeSerivce extends BaseService {
    public async insertMany(modes: NewGameMode[]) {
        const result = await this.db
            .insert(this.schema.game_modes)
            .values(modes)
            .onConflictDoNothing()
            .returning({ id: this.schema.game_modes.id })

        return result.length
    }
}

const gameModeService = new GameModeSerivce()

export function useGameModeService() {
    return gameModeService
}
