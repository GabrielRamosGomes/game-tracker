import { genreService } from '~/server/services/genreService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const genres = await igbd_client.fetchGenres()

    if (!genres.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No game genres found'
        })
    }

    const insertedRecords = await genreService.insertMany(genres)

    return {
        message: `Inserted ${insertedRecords} game genres into the database`
    }
})
