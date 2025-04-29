import { BaseService } from './baseService'
import type { NewCountry } from '../database/schema'
import { countries } from '../database/schema'

interface ISO_3166_Country {
    name: {
        common: string
    }
    ccn3: string
}

class CountryService extends BaseService<typeof countries> {
    public async insertMany(countryList: NewCountry[]) {
        return this.insert(countryList, countries.id)
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

export const countryService = new CountryService(countries, countries.id)
