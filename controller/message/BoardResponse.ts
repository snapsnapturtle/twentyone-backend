export interface BoardResponse {
    id: number;
    name: string;
    width: number;
    height: number;
    gridType: 'NONE' | 'SQUARE';
    gridLineColor?: string;
}
