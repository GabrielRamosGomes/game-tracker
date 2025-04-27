import { BaseService } from './baseService'
import type { NewKeyword } from '../database/schema'
import { keywords } from '../database/schema'

class KeywordService extends BaseService {
    public async insertMany(types: NewKeyword[]) {
        return await this.insert(types, this.schema.keywords.id)
    }
}

const keywordService = new KeywordService(keywords)

export function useKeywordService() {
    return keywordService
}
