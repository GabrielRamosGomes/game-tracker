import { BaseService } from './baseService'
import type { NewCompanyStatus } from '../database/schema'
import { companies_status } from '../database/schema'

class CompanyStatusService extends BaseService<typeof companies_status> {
    public async insertMany(statuses: NewCompanyStatus[]) {
        return await this.insert(statuses, companies_status.id)
    }

    public async insertOne(status: NewCompanyStatus) {
        return await this.insert(status, companies_status.id)
    }
}

export const companyStatus = new CompanyStatusService(companies_status)
