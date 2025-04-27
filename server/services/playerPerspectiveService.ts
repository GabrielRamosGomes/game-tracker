import { BaseService } from './baseService'
import type { NewPlayerPerspective } from '../database/schema'
import { player_perspectives } from '../database/schema'

class PlayerPerspectiveService extends BaseService {
    public async insertMany(types: NewPlayerPerspective[]) {
        return await this.insert(types, this.schema.player_perspectives.id)
    }
}

const playerPerspectiveService = new PlayerPerspectiveService(player_perspectives)

export function usePlayerPerspectiveService() {
    return playerPerspectiveService
}
