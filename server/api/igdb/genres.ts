import { useGenreService } from '~/server/services/genreService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const genreService = useGenreService()

    const genres = await igbd_client.fetchGenres()

    if (!genres.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No game Types found'
        })
    }

    const insertedRecords = await genreService.insertMany(genres)

    return {
        message: `Inserted ${insertedRecords} game genres into the database`
    }
})
