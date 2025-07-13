import { timeToBeatService } from '~/server/services/timeToBeat'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const timeToBeats = await igbd_client.fetchTimeToBeat()

    if (!timeToBeats.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No themes found'
        })
    }

    const insertedRecords = await timeToBeatService.insert(timeToBeats)

    return {
        message: `Inserted ${insertedRecords} time to beat records`,
    }
})
