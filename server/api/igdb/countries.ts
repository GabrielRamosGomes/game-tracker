import { countryService } from '~/server/services/countryService'

export default defineEventHandler(async () => {
    const countries = await countryService.fetchCountries()

    if (!countries.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No countries found'
        })
    }

    const insertedRecords = await countryService.insert(countries)

    return {
        message: `Inserted ${insertedRecords} countries into the database`
    }
})
