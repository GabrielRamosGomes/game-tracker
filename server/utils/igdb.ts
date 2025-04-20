class IGDB_Client {
    private client_id: string;
    private access_token: string;

    private base_url: string = "https://api.igdb.com/v4";

    constructor(client_id: string, access_token: string) {
        this.client_id = client_id;
        this.access_token = access_token;
    }

    private get headers() {
        return {
            "Client-ID": this.client_id,
            Authorization: `Bearer ${this.access_token}`,
            "Content-Type": "application/json",
        };
    }

    private async request<T>(endpoint: string, body: string): Promise<T> {
        const response = await $fetch(`${this.base_url}/${endpoint}`, {
            method: "POST",
            headers: this.headers,
            body: body,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}

const igbd_client = new IGDB_Client(
    process.env.IGBD_CLIENT_ID as string,
    process.env.IGBD_ACCESS_TOKEN as string
);

export function useIGBD() {
    return igbd_client;
}
