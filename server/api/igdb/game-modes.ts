import { gameModeService } from '~/server/services/gameModeService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const gameModes = await igbd_client.fetchGameModes()

    if (!gameModes.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No game modes found'
        })
    }

    const insertedRecords = await gameModeService.insertMany(gameModes)

    return {
        message: `Inserted ${insertedRecords} game modes into the database`
    }
})
