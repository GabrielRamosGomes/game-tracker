import { BaseService } from './baseService'
import { game_modes, game_modes_games } from '../database/schema'

import type { NewGameModeGame } from '../database/schema'

class GameMomeGamesService extends BaseService<typeof game_modes_games> {}
const gameModeGameService = new GameMomeGamesService(game_modes_games, game_modes_games.id)

class GameModeService extends BaseService<typeof game_modes> {
    public async insertGameModesGames(data: NewGameModeGame[]) {
        const records = await gameModeGameService.bulkInsert(data)
        console.log(`Inserted ${records} game modes into the database`)
        return records
    }
}

export const gameModeService = new GameModeService(game_modes, game_modes.id)
