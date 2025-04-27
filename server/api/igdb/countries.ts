export default defineEventHandler(async () => {
    const countries = await fetchCountries()
    const { db, schema } = useDrizzle()

    if (!countries.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No countries found',
        })
    }

    let insertedCountries = 0
    await db.transaction(async (tx) => {
        const result = await tx.insert(schema.countries)
            .values(countries)
            .onConflictDoNothing()
            .returning({ id: schema.countries.id })

        insertedCountries = result.length
    });

    return {
        message: `Inserted ${insertedCountries} countries into the database`,
    }

})
