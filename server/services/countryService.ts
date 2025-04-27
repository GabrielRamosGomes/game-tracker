import { BaseService } from './baseService'
import type { NewCountry } from '../database/schema'

interface ISO_3166_Country {
    name: {
        common: string
    }
    ccn3: string
}

class CountryService extends BaseService {
    public async insertMany(countries: NewCountry[]) {
        const result = await this.db
            .insert(this.schema.countries)
            .values(countries)
            .onConflictDoNothing()
            .returning({ id: this.schema.countries.id })

        return result.length
    }

    public async fetchCountries() {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countryList: Array<ISO_3166_Country> = await response.json()

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const countries: NewCountry[] = countryList.map((country: ISO_3166_Country) => {
            return {
                name: country.name.common,
                code: country.ccn3
            }
        })

        return countries
    }
}

const countryService = new CountryService()

export function useCountryService() {
    return countryService
}
