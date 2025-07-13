import { BaseService } from './baseService'
import { keywords, game_keywords } from '../database/schema'
import type { NewGameKeyword } from '../database/schema'


class GameKeywordService extends BaseService<typeof game_keywords> {}
const gameKeywordService = new GameKeywordService(game_keywords, game_keywords.id)

class KeywordService extends BaseService<typeof keywords> {
    public async insertGameKeywords(data: NewGameKeyword[]) {
        const records = await gameKeywordService.bulkInsert(data)
        console.log(`Inserted ${records} game keywords into the database`)
        return records;
    }
}

export const keywordService = new KeywordService(keywords, keywords.id)
