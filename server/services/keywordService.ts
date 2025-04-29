import { BaseService } from './baseService'
import type { NewKeyword } from '../database/schema'
import { keywords } from '../database/schema'

class KeywordService extends BaseService<typeof keywords> {
    public async insertMany(types: NewKeyword[]) {
        return await this.insert(types, keywords.id)
    }
}

export const keywordService = new KeywordService(keywords, keywords.id)
