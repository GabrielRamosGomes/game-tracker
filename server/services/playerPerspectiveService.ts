import { BaseService } from './baseService'
import type { NewPlayerPerspective } from '../database/schema'
import { player_perspectives } from '../database/schema'

class PlayerPerspectiveService extends BaseService<typeof player_perspectives> {
    public async insertMany(types: NewPlayerPerspective[]) {
        return await this.insert(types, player_perspectives.id)
    }
}

export const playerPerspectiveService = new PlayerPerspectiveService(player_perspectives)
