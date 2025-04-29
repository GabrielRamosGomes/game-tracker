import { BaseService } from './baseService'
import { keywords } from '../database/schema'

class KeywordService extends BaseService<typeof keywords> {}

export const keywordService = new KeywordService(keywords, keywords.id)
