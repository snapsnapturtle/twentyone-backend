import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile';

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const knex = Knex(knexConfig[ environment ]);

Model.knex(knex);
