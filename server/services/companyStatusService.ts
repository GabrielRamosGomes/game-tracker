import { BaseService } from "./baseService"
import type { NewCompanyStatus } from "../database/schema"

class CountryService extends BaseService {
   
    public async insertCompanyStatuses(statuses: NewCompanyStatus[]) {
        
        const result = await this.db.insert(this.schema.companies_status)
            .values(statuses)
            .onConflictDoNothing()
            .returning({ id: this.schema.companies_status.id })

        return result.length;
    }
}

const countryService = new CountryService()

export function useCompanyStatusService() {
    return countryService
}