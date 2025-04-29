import { gameTypeService } from '~/server/services/gameTypeService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const gameTypes = await igbd_client.fetchGameTypes()

    if (!gameTypes.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No game Types found'
        })
    }

    const insertedRecords = await gameTypeService.insert(gameTypes)

    return {
        message: `Inserted ${insertedRecords} game types into the database`
    }
})
