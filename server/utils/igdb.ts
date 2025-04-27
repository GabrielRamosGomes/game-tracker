import type { NewCompanyStatus, NewGameMode } from '../database/schema'

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

    /**
     * Fetch all games from IGDB API, use this with caution as it will return a lot of data.
     * Main use is to have an initial list of games to work with.
     */
    public async fetchAllGames(batchSize: number = 500) {
        let offset = 0
        const allGames = []

        while (true) {
            const query = `
                fields name, game_type, genres, first_release_date, rating, storyline, url, involved_companies, game_status, expansions, dlcs, age_ratings, collections, cover, aggregated_rating, game_engines;
                limit 500; 
                offset ${offset};
                `

            const batch: unknown[] = await this.request('games', query, true)
            allGames.push(...batch)
            if (batch.length < batchSize) break
            offset += batchSize
        }

        return allGames
    }

    public async fetchCompanyStatus() {
        const query = `
            fields name;
            offset 0;
            sort id asc;
        `
        const companies: NewCompanyStatus[] = await this.request('company_statuses', query)

        return companies
    }

    public async fetchGameModes() {
        const query = `
            fields name,slug;
            offset 0;
            sort id asc;
        `
        const gameModes: NewGameMode[] = await this.request('game_modes', query)

        return gameModes
    }
}

const igbd_client = new IGDB_Client(
    process.env.IGDB_CLIENT_ID as string,
    process.env.IGDB_CLIENT_ACESS_TOKEN as string
)

export function useIGBD() {
    return igbd_client
}
