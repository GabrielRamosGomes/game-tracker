import { BaseService } from './baseService'
import { player_perspectives } from '../database/schema'

class PlayerPerspectiveService extends BaseService<typeof player_perspectives> {}

export const playerPerspectiveService = new PlayerPerspectiveService(
    player_perspectives,
    player_perspectives.id
)
