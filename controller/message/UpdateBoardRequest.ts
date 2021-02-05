export interface UpdateBoardRequest {
    name: string;
    width: number;
    height: number;
    gridType: 'NONE' | 'SQUARE';
    gridLineColor?: string;
}
