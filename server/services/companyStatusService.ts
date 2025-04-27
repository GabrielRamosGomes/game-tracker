import { BaseService } from './baseService'
import type { NewCompanyStatus } from '../database/schema'
import { companies_status } from '../database/schema'

class CompanyStatus extends BaseService {
    public async insertMany(statuses: NewCompanyStatus[]) {
        return await this.insert(statuses, this.schema.companies_status.id)
    }
}

const companyStatus = new CompanyStatus(companies_status)

export function useCompanyStatusService() {
    return companyStatus
}
