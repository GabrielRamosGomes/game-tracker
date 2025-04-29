import { BaseService } from './baseService'
import { companies_status } from '../database/schema'

class CompanyStatusService extends BaseService<typeof companies_status> {}

export const companyStatus = new CompanyStatusService(companies_status, companies_status.id)
