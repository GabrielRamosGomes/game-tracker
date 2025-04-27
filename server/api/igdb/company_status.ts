export default defineEventHandler(async () => {
    const igbd_client = useIGBD()
    const { db, schema } = useDrizzle()

    const companyStatuses = await igbd_client.fetchCompanyStatus()
    
    if (!companyStatuses.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No company statuses found',
        })
    }
    
    let insertedCompanyStatuses = 0;
    await db.transaction(async (tx) => {
        const result = await tx.insert(schema.companies_status)
            .values(companyStatuses)
            .onConflictDoNothing()
            .returning({ id: schema.companies_status.id })

        insertedCompanyStatuses = result.length
    });

    return {
        message: `Inserted ${insertedCompanyStatuses} company statuses into the database`,
    }

})
