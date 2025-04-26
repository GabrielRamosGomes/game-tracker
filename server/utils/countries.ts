interface ISO_3166_Country {
    name: {
        common: string
    }
    ccn3: string
}

// This won't use the IGDB API, but theres is no need to create a new class for this.
export async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countryList: Array<ISO_3166_Country> = await response.json()

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    const countries = countryList.map((country: ISO_3166_Country) => {
        return {
            name: country.name.common,
            code: country.ccn3
        }
    })

    return countries
}
