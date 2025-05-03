import type {
    NewCompany,
    NewCompanyStatus,
    NewGame,
    NewGameEngine,
    NewGameMode,
    NewGameType,
    NewGenre,
    NewKeyword,
    NewPlatform,
    NewPlatformFamily,
    NewPlatformType,
    NewPlayerPerspective,
    NewTheme
} from '../database/schema'

/**
 * Wrapper for the IGDB API
 * @see https://api-docs.igdb.com/#endpoints
 */
class IGDB_Client {
    private client_id: string
    private access_token: string

    private base_url: string = 'https://api.igdb.com/v4'

    constructor(client_id: string, access_token: string) {
        this.client_id = client_id
        this.access_token = access_token
    }

    private get headers() {
        return {
            'Client-ID': this.client_id,
            Authorization: `Bearer ${this.access_token}`,
            'Content-Type': 'application/json'
        }
    }

    /**
     * Sleeps for a given number of milliseconds.
     * This is used to avoid rate limiting from the IGDB API
     * @param ms The number of milliseconds to sleep defaults to 250ms
     * @returns A promise that resolves after the given number of milliseconds
     */
    private sleep(ms: number = 250) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    /**
     * Makes a request to the IGDB API
     * @param endpoint The endpoint to request
     * @param body The body of the request
     * @param shouldSleep Whether to sleep before making the request (to avoid rate limiting)
     * @returns The response from the IGDB API
     */
    private async request<T>(
        endpoint: string,
        body: string,
        shouldSleep: boolean = false
    ): Promise<T> {
        // sleep to avoid rate limiting
        if (shouldSleep) await this.sleep()

        const response = await fetch(`${this.base_url}/${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: body
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    private async batchRequest<T>(endpoint: string, body: string, batchSize: number = 500) {
        const allData: T[] = []
        let offset = 0

        while (true) {
            const query = `${body} limit ${batchSize}; offset ${offset};`
            const data: T[] = await this.request(endpoint, query, true)
            allData.push(...data)

            console.log(`Fetched ${data.length} records from ${endpoint} with offset ${offset}`)
            if (data.length < batchSize) {
                console.log(`Fetched all records from ${endpoint}`)
                console.log(`Total records fetched: ${allData.length}`)
                break
            }

            offset += batchSize
        }

        return allData
    }

    /**
     * Fetches all games from IGDB API, this might take a while since there are a lot of games
     * @param batchSize The number of records to fetch in each request
     */
    public async fetchGames(batchSize: number = 500) {
        const query = `
            fields aggregated_rating, storyline, game_type, name, slug, first_release_date;
            limit ${batchSize};
            offset 0;
        `
        const allGames = await this.batchRequest<NewGame>('games', query, batchSize)

        return allGames
    }

    /**
     * Fetches all game engines from IGDB API
     */
    public async fetchCompanyStatus() {
        const query = `
            fields name;
            offset 0;
            sort id asc;
        `
        const companies = await this.request<NewCompanyStatus[]>('company_statuses', query)

        return companies
    }

    /**
     * Fetches all companies from IGDB API
     */
    public async fetchCompanies() {
        const query = `
            fields description,name,status,slug,country;
            limit 500;
            offset 0;
            sort id asc;
        `

        const companies = await this.batchRequest<NewCompany>('companies', query)

        return companies
    }

    /**
     * Fetches all game modes from IGDB API
     */
    public async fetchGameModes() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const gameModes = await this.request<NewGameMode[]>('game_modes', query)

        return gameModes
    }

    /**
     * Fetches all game types from IGDB API
     */
    public async fetchGameTypes() {
        const query = `
            fields type;
            offset 0;
            sort id asc;
        `
        const gameTypes = await this.request<NewGameType[]>('game_types', query)

        return gameTypes
    }

    /**
     * Fetches all game engines from IGDB API
     */
    public async fetchGenres() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const genres = await this.request<NewGenre[]>('genres', query)

        return genres
    }

    /**
     * Fetches all keywords from IGDB API
     */
    public async fetchKeywords() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const keywords = await this.batchRequest<NewKeyword>('keywords', query)

        return keywords
    }

    /**
     * Fetches all platform families from IGDB API
     */
    public async fetchPlatformFamilies() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const platformFamilies = await this.request<NewPlatformFamily[]>('platform_families', query)

        return platformFamilies
    }

    /**
     * Fetches all platform types from IGDB API
     */
    public async fetchPlatformTypes() {
        const query = `
            fields name;
            offset 0;
            sort id asc;
        `
        const platformTypes = await this.request<NewPlatformType[]>('platform_types', query)

        return platformTypes
    }

    /**
     * Fetches all player perspectives from IGDB API
     */
    public async fetchPlayerPerspectives() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const playerPerspectives = await this.request<NewPlayerPerspective[]>(
            'player_perspectives',
            query
        )

        return playerPerspectives
    }

    /**
     * Fetches all game engines from IGDB API
     */
    public async fetchGameEngines() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const gameEngines = await this.batchRequest<NewGameEngine>('game_engines', query)

        return gameEngines
    }

    /**
     * Fetches all platforms from IGDB API
     */
    public async fetchPlatforms() {
        const query = `
            fields abbreviation,name,platform_family,platform_type,slug;
            offset 0;
            sort id asc;
        `
        const platforms = await this.batchRequest<NewPlatform>('platforms', query)

        return platforms
    }

    /**
     * Fetches all themes from IGDB API
     */
    public async fetchThemes() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const themes = await this.request<NewTheme[]>('themes', query)

        return themes
    }
}

const igdb_client = new IGDB_Client(
    process.env.IGDB_CLIENT_ID as string,
    process.env.IGDB_CLIENT_ACCESS_TOKEN as string
)

export function useIGBD() {
    return igdb_client
}
