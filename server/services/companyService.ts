import { BaseService } from './baseService'
import { companies } from '../database/schema'

class CompanyService extends BaseService<typeof companies> {}

export const companyService = new CompanyService(companies, companies.id)
