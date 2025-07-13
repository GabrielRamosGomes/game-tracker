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
    public async fetchCountries() {
        const searchParams = new URLSearchParams({
            fields: 'name,ccn3'
        })
        const response = await fetch(
            `https://restcountries.com/v3.1/all?${searchParams.toString()}`
        )
        const countryList: Array<ISO_3166_Country> = await response.json()

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const countries: NewCountry[] = countryList.map((country: ISO_3166_Country) => {
            const codeNumber = parseInt(country.ccn3)
            return {
                name: country.name.common,
                code: isNaN(codeNumber) ? null : codeNumber
            }
        })

        return countries
    }
}

export const countryService = new CountryService(countries, countries.id)
