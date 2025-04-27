import { BaseService } from './baseService'
import type { NewGameType } from '../database/schema'
import { game_types } from '../database/schema'

class GameTypeService extends BaseService {
    public async insertMany(types: NewGameType[]) {
       return await this.insert(types, this.schema.game_types.id)
    }
}

const gameTypeService = new GameTypeService(game_types)

export function useGameTypeService() {
    return gameTypeService
}
