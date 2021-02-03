import { Model } from 'objection';
import { Board } from './Board';

export class Session extends Model {
    id!: number;
    session_key!: string;

    static get tableName() {
        return 'sessions';
    }

    static relationMappings = {
        boards: {
            relation: Model.HasManyRelation,
            modelClass: Board,
            join: {
                from: 'sessions.id',
                to: 'boards.id_session'
            }
        }
    };
}
