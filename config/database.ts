import Knex from 'knex';
import { Model } from 'objection';
// @ts-ignore
import knexConfig from '../knexfile';

const knex = Knex(knexConfig.development);

Model.knex(knex);

