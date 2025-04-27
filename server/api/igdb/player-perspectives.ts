import { usePlayerPerspectiveService } from '~/server/services/playerPerspectiveService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const playerPerspectiveService = usePlayerPerspectiveService()

    const perspectives = await igbd_client.fetchPlayerPerspectives()

    if (!perspectives.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No players perspectives found'
        })
    }

    const insertedRecords = await playerPerspectiveService.insertMany(perspectives)

    return {
        message: `Inserted ${insertedRecords} player perspectives into the database`
    }
})
