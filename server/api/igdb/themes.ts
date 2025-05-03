import { themesService } from '~/server/services/themesService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const themes = await igbd_client.fetchThemes()

    if (!themes.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No themes found'
        })
    }

    const insertedRecords = await themesService.insert(themes)

    return {
        message: `Inserted ${insertedRecords} themes into the database`
    }
})
