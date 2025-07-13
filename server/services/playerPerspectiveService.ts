import { BaseService } from './baseService'
import { player_perspectives, game_player_perspectives } from '../database/schema'
import type { NewGamePlayerPerspective } from '../database/schema'

class GamePlayerPerspectiveService extends BaseService<typeof game_player_perspectives> {
    public async insert(playerPerspectives: NewGamePlayerPerspective[]) {
        return this.bulkInsert(playerPerspectives)
    }
}
const gamePlayerPerspectiveService = new GamePlayerPerspectiveService(
    game_player_perspectives,
    game_player_perspectives.id
)

class PlayerPerspectiveService extends BaseService<typeof player_perspectives> {
    public async insertGamePlayerPerspectives(data: NewGamePlayerPerspective[]) {
        const records = await gamePlayerPerspectiveService.bulkInsert(data)
        console.log(`Inserted ${records} game modes into the database`)
        return records
    }
}

export const playerPerspectiveService = new PlayerPerspectiveService(
    player_perspectives,
    player_perspectives.id
)
