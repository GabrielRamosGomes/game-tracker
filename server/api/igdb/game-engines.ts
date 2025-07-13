import { gameEngineService } from '~/server/services/gameEngineService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const engines = await igbd_client.fetchGameEngines()

    if (!engines.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No game engines found'
        })
    }

    const insertedRecords = await gameEngineService.bulkInsert(engines)

    return {
        message: `Inserted ${insertedRecords} game engines into the database`
    }
})
