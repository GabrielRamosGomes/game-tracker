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

    public async insert(
        data: TTable['$inferInsert'] | TTable['$inferInsert'][],
    ) {
        const values = Array.isArray(data) ? data : [data]

        const result = await this.db
            .insert(this.table)
            .values(values)
            .onConflictDoNothing()
            .returning({ id: this.idColumn })

        return result.length
    }

    public async findAll(): Promise<TTable['$inferSelect'][]> {
        const result = await this.db.select().from(this.table)

        return result
    }

    public async findById(id: string | number)
    {
        const result = await this.db
            .select()
            .from(this.table)
            .where(eq(this.idColumn, id))
            .limit(1)

        return result[0]
    }

    public async updatedById(id: string | number, data: TTable['$inferInsert'])
    {
        const row = await this.db
            .update(this.table)
            .set(data)
            .where(eq(this.idColumn, id))
            .returning()
        
        return row[0] ?? null
    }

    public async deleteById(id: string | number)
    {
        const { rowCount,  } = await this.db
            .delete(this.table)
            .where(eq(this.idColumn, id))
            .execute()

        return rowCount
    }
}
