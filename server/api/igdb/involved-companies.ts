import { involvedCompaniesService } from '~/server/services/involvedCompanies'

export default defineEventHandler(async () => {
    const igdb_client = useIGBD()
    const involvedCompanies = await igdb_client.fetchInvolvedCompanies()

    if (!involvedCompanies.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No companies found'
        })
    }

    const insertedRecords = await involvedCompaniesService.bulkInsert(involvedCompanies)

    return {
        message: `Inserted ${insertedRecords} companies into the database`
    }
})
