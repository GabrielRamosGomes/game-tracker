import { gameService } from '~/server/services/gameService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const games = await igbd_client.fetchGames()

    if (!games.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No games found'
        })
    }

    const insertedRecords = await gameService.bulkInsert(games)

    return {
        message: `Inserted ${insertedRecords} games into the database`
    }
})
