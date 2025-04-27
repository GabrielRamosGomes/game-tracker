import type { NodePgDatabase } from "drizzle-orm/node-postgres"
import type * as schema from "../database/schema"

export class BaseService {
    protected db: NodePgDatabase<typeof schema>
    protected schema: typeof schema

    constructor() {
        const { db, schema } = useDrizzle()

        this.db = db
        this.schema = schema
    }
}