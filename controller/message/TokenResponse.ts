export interface TokenResponse {
    id: number;
    name?: string;
    assetUrl?: string;
    position: {
        x: number;
        y: number;
    }
}
