import { Model } from 'objection';
import { Board } from './Board';

export class Campaign extends Model {
    id!: number;
    name!: string;

    static get tableName() {
        return 'campaigns';
    }

    static relationMappings = {
        boards: {
            relation: Model.HasManyRelation,
            modelClass: Board,
            join: {
                from: 'campaigns.id',
                to: 'boards.id_campaign'
            }
        }
    };
}
