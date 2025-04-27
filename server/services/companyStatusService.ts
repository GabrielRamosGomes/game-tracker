import { BaseService } from './baseService'
import type { NewCompanyStatus } from '../database/schema'
import { companies_status } from '../database/schema'

class CompanyStatusService extends BaseService {
    public async insertMany(statuses: NewCompanyStatus[]) {
        return await this.insert(statuses, this.schema.companies_status.id)
    }
}

const companyStatus = new CompanyStatusService(companies_status)

export function useCompanyStatusService() {
    return companyStatus
}
