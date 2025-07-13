import { BaseService } from './baseService'
import { involved_companies } from '../database/schema'

class InvolvedCompanies extends BaseService<typeof involved_companies> {}

export const involvedCompaniesService = new InvolvedCompanies(
    involved_companies,
    involved_companies.id
)
