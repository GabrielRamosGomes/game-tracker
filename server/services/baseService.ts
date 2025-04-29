import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type * as schema from '../database/schema'
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core'

export abstract class BaseService<TTable extends PgTable> {
    protected db: NodePgDatabase<typeof schema>
    protected table: PgTable

    constructor(table: TTable) {
        const { db } = useDrizzle()

        this.db = db
        this.table = table
    }

    protected async insert(
        data: TTable['$inferInsert'] | TTable['$inferInsert'][],
        returningField: PgColumn
    ) {
        const values = Array.isArray(data) ? data : [data]

        const result = await this.db
            .insert(this.table)
            .values(values)
            .onConflictDoNothing()
            .returning({ id: returningField })

        return result.length
    }

    protected async findAll(): Promise<TTable['$inferSelect'][]> {
        const result = await this.db.select().from(this.table)

        return result
    }

    protected async delete() {
        // TODO: implement delete
    }

    protected async update() {
        // TODO: implement update
    }
}
