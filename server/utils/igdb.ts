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

    private async request<T>(endpoint: string, body: string): Promise<T> {
        const response = await $fetch(`${this.base_url}/${endpoint}`, {
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

            const batch: unknown[] = await this.request('games', query)
            allGames.push(...batch)
            if (batch.length < batchSize) break
            offset += batchSize
        }

        return allGames
    }

    public async fetchTimeToBeat() {}
}

const igbd_client = new IGDB_Client(
    process.env.IGBD_CLIENT_ID as string,
    process.env.IGBD_ACCESS_TOKEN as string
)

export function useIGBD() {
    return igbd_client
}
