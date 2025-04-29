import { platformTypeService } from '~/server/services/platformTypeService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const types = await igbd_client.fetchPlatformTypes()

    if (!types.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No platform types found'
        })
    }

    const insertedRecords = await platformTypeService.insert(types)

    return {
        message: `Inserted ${insertedRecords} platform types into the database`
    }
})
