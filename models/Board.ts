import { Model } from 'objection';

export class Board extends Model {
    id!: number;
    id_campaign!: number;
    name!: string;
    width!: number;
    height!: number;
    grid_type!: 'NONE' | 'SQUARE';
    grid_line_color?: string;

    static get tableName() {
        return 'boards';
    }
}
