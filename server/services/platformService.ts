import { BaseService } from './baseService'
import { platforms, game_platforms } from '../database/schema'
import type { NewGamePlatform } from '../database/schema'

class GamePlatformService extends BaseService<typeof game_platforms> {}
const gamePlatformService = new GamePlatformService(game_platforms, game_platforms.id)

class PlatformService extends BaseService<typeof platforms> {
    public async insertGamePlatforms(data: NewGamePlatform[]) {
        const records = await gamePlatformService.bulkInsert(data)
        console.log(`Inserted ${records} game platforms into the database`)
        return records
    }
}

export const platformService = new PlatformService(platforms, platforms.id)
