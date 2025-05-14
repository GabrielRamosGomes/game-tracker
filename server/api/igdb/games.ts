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

    // Transform the first_release_date from Unix timestamp to Date object
    const transformedData = games.map((game) => {
        const transformedDate = game.first_release_date
            ? new Date((game.first_release_date as unknown as number) * 1000)
            : null

        return {
            ...game,
            first_release_date: transformedDate,
        }
    })

    const insertedRecords = await gameService.bulkInsert(transformedData)

    return {
        message: `Inserted ${insertedRecords} games into the database`
    }
})
