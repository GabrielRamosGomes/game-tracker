import { useKeywordService } from '~/server/services/keywordService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const keywordService = useKeywordService()

    const keywords = await igbd_client.fetchKeywords()

    if (!keywords.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No game Types found'
        })
    }

    const insertedRecords = await keywordService.insertMany(keywords)

    return {
        message: `Inserted ${insertedRecords} keywords into the database`
    }
})
