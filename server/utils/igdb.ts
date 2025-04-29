import type {
    NewCompanyStatus,
    NewGameMode,
    NewGameType,
    NewGenre,
    NewKeyword,
    NewPlatformFamily,
    NewPlatformType,
    NewPlayerPerspective
} from '../database/schema'

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

    // sleep function to avoid rate limiting (4 requests per second)
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
    public async fetchAllGames(batchSize: number = 500) {
        const query = `
            fields name, game_type, genres, first_release_date, rating, storyline, url, involved_companies, game_status, expansions, dlcs, age_ratings, collections, cover, aggregated_rating, game_engines;
            limit ${batchSize};
            offset 0;
        `
        const allGames: unknown[] = await this.batchRequest('games', query, batchSize)

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
        const companies: NewCompanyStatus[] = await this.request('company_statuses', query)

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
        const gameModes: NewGameMode[] = await this.request('game_modes', query)

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
        const gameTypes: NewGameType[] = await this.request('game_types', query)

        return gameTypes
    }

    /**
     * Fetchs all game engines from IGDB API
     */
    public async fetchGenres() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const genres: NewGenre[] = await this.request('genres', query)

        return genres
    }

    /**
     * Fetchs all keywords from IGDB API
     */
    public async fetchKeywords() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const keywords: NewKeyword[] = await this.batchRequest('keywords', query)

        return keywords
    }

    /**
     * Fetchs all platform families from IGDB API
     */
    public async fetchPlatformFamilies() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const platformFamilies: NewPlatformFamily[] = await this.request('platform_families', query)

        return platformFamilies
    }

    /**
     * Fetchs all platform types from IGDB API
     */
    public async fetchPlatformTypes() {
        const query = `
            fields name;
            offset 0;
            sort id asc;
        `
        const platformTypes: NewPlatformType[] = await this.request('platform_types', query)

        return platformTypes
    }

    /**
     * Fetchs all player perspectives from IGDB API
     */
    public async fetchPlayerPerspectives() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const playerPerspectives: NewPlayerPerspective[] = await this.request(
            'player_perspectives',
            query
        )

        return playerPerspectives
    }
}

const igdb_client = new IGDB_Client(
    process.env.IGDB_CLIENT_ID as string,
    process.env.IGDB_CLIENT_ACCESS_TOKEN as string
)

export function useIGBD() {
    return igdb_client
}
