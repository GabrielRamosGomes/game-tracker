import { useCompanyStatusService } from '~/server/services/companyStatusService'

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const companyStatusService = useCompanyStatusService()

    const companyStatuses = await igbd_client.fetchCompanyStatus()

    if (!companyStatuses.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No company statuses found'
        })
    }

    const insertedRecords = await companyStatusService.insertCompanyStatuses(companyStatuses)

    return {
        message: `Inserted ${insertedRecords} company statuses into the database`
    }
})
