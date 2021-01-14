import { Model } from 'objection';

export class Token extends Model {
    id!: number;
    name?: string;
    id_session!: number;
    position_x!: number;
    position_y!: number;

    static get tableName() {
        return 'tokens';
    }
}
