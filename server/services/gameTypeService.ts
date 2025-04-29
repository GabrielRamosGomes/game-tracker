import { BaseService } from './baseService'
import type { NewGameType } from '../database/schema'
import { game_types } from '../database/schema'

class GameTypeService extends BaseService<typeof game_types> {
    public async insertMany(types: NewGameType[]) {
        return await this.insert(types, game_types.id)
    }
}

export const gameTypeService = new GameTypeService(game_types)
