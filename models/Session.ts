import { Model } from 'objection';

export class Session extends Model {
    id!: number;
    session_key!: string;

    static get tableName() {
        return 'sessions';
    }
}
