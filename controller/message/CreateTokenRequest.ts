export interface CreateTokenRequest {
    name?: string;
    asset?: string;
    position: {
        x: number;
        y: number;
    };
}
