import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type * as schema from '../database/schema'
import type { Table } from 'drizzle-orm'
import type { PgColumn } from 'drizzle-orm/pg-core'

export abstract class BaseService {
    protected db: NodePgDatabase<typeof schema>
    protected schema: typeof schema
    protected table: Table

    constructor(table: Table) {
        const { db, schema } = useDrizzle()

        this.db = db
        this.schema = schema
        this.table = table
    }

    protected async insert<T>(data: T[], returningField: PgColumn) {
        const result = await this.db
            .insert(this.table)
            .values(data)
            .onConflictDoNothing()
            .returning({ id: returningField })

        return result.length
    }

    protected async delete() {
        // TODO: implement delete
    }

    protected async update() {
        // TODO: implement update
    }
}
