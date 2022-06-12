import axios, { AxiosRequestHeaders } from "axios";

export class Request {
    private headers: AxiosRequestHeaders;

    constructor (private url: string, headers?: {[key: string]: string}) {
        this.headers = headers ?? {};
    }

    public async makeRequest(): Promise<string> {
        let response;

        try {
            response = await axios({
                url: this.url,
                method: 'GET',
                headers: this.headers,
                // Prevent parsing
                responseType: "text",
                transformResponse: [(v) => v],
            });
        } catch (error) {
            if (!error.response) {
                // An actual HTTP error occurred. Not just a non-200 response.
                throw error;
            }

            response = error.response;
        }
        
        return response.data;
    }
}