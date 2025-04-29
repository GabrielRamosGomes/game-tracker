import { platformFamilyService } from '~/server/services/platformFamilyService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()

    const families = await igbd_client.fetchPlatformFamilies()

    if (!families.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No platform families found'
        })
    }

    const insertedRecords = await platformFamilyService.insert(families)

    return {
        message: `Inserted ${insertedRecords} platform families into the database`
    }
})
