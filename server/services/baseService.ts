import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type * as schema from '../database/schema'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'
import { eq } from 'drizzle-orm'

export abstract class BaseService<TTable extends PgTable> {
    protected db: NodePgDatabase<typeof schema>
    protected table: PgTable
    private idColumn: PgColumn

    constructor(table: TTable, idColumn: PgColumn) {
        const { db } = useDrizzle()

        this.db = db
        this.table = table
        this.idColumn = idColumn
    }

    /**
     * Insert a single record or an array of records into the table.
     * @param data - The data to insert. Can be a single object or an array of objects.
     * @returns The number of inserted records.
     */
    public async insert(data: TTable['$inferInsert'] | TTable['$inferInsert'][]) {
        const values = Array.isArray(data) ? data : [data]

        const result = await this.db
            .insert(this.table)
            .values(values)
            .onConflictDoNothing()
            .returning({ id: this.idColumn })

        return result.length
    }

    /**
     * Bulk insert records into the table in batches.
     * @param data - The data to insert. Must be an array of objects.
     * @param batchSize - The size of each batch. Default is 500.
     * @returns The number of inserted records.
     */
    public async bulkInsert(data: TTable['$inferInsert'][], batchSize = 500) {
        let insertedCount = 0
        const totalRecords = data.length

        return this.db.transaction(async (tx) => {
            const chunks = this.chunkArray(data, batchSize)
            for (const chunk of chunks) {
                const result = await tx
                    .insert(this.table)
                    .values(chunk)
                    .onConflictDoNothing()
                    .returning({ id: this.idColumn })

                insertedCount += result.length

                console.log(`Inserted ${result.length} from ${chunk.length} records`)
            }

            console.log(`Inserted ${insertedCount} from ${totalRecords} records`)
            return insertedCount
        })
    }

    /**
     * Find all records in the table.
     * @returns An array of records.
     */
    public async findAll(): Promise<TTable['$inferSelect'][]> {
        const result = await this.db.select().from(this.table)

        return result
    }

    /**
     * Find records by id.
     * @param id - The id of the record to find.
     * @returns The record if found, otherwise null.
     */
    public async findById(id: string | number): Promise<TTable['$inferSelect'] | null> {
        const result = await this.db.select().from(this.table).where(eq(this.idColumn, id)).limit(1)

        return result[0] ?? null
    }

    /**
     * Update a record by id.
     * @param id - The id of the record to update.
     * @param data - The data to update.
     * @returns The updated record if found, otherwise null.
     */
    public async updateById(
        id: string | number,
        data: TTable['$inferInsert']
    ): Promise<TTable['$inferSelect'] | null> {
        const row = await this.db
            .update(this.table)
            .set(data)
            .where(eq(this.idColumn, id))
            .returning()

        return row[0] ?? null
    }

    /**
     * Delete a record by id.
     * @param id - The id of the record to delete.
     * @returns The number of deleted records.
     */
    public async deleteById(id: string | number) {
        const { rowCount } = await this.db.delete(this.table).where(eq(this.idColumn, id)).execute()

        return rowCount
    }

    private chunkArray<T>(array: T[], chunkSize: number): T[][] {
        const result: T[][] = []
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize))
        }
        return result
    }
}
