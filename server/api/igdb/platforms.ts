import { platformService } from '~/server/services/platformService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const platforms = await igbd_client.fetchPlatforms()

    if (!platforms.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No platforms found'
        })
    }

    const insertedRecords = await platformService.bulkInsert(platforms)

    return {
        message: `Inserted ${insertedRecords} platform types into the database`
    }
})
