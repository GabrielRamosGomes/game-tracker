import { BaseService } from './baseService'
import { game_engines, game_engines_games } from '../database/schema'
import type { NewGameEngineGame } from '../database/schema'

class GameEnginesGamesService extends BaseService<typeof game_engines_games> {}
const gameEnginesGamesService = new GameEnginesGamesService(game_engines_games, game_engines_games.id)

class GameEnginesService extends BaseService<typeof game_engines> {
    public async insertGameEnginesGames(data: NewGameEngineGame[]) {
        const records = await gameEnginesGamesService.bulkInsert(data)
        console.log(`Inserted ${records} game engines into the database`)
        return records
    }
}

export const gameEngineService = new GameEnginesService(game_engines, game_engines.id)
