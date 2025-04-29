import { companyStatus } from '~/server/services/companyStatusService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const companyStatuses = await igbd_client.fetchCompanyStatus()

    if (!companyStatuses.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No company statuses found'
        })
    }

    const insertedRecords = await companyStatus.insertMany(companyStatuses)

    return {
        message: `Inserted ${insertedRecords} company statuses into the database`
    }
})
