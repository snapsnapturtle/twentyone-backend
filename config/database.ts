import Knex from 'knex';
import { Model } from 'objection';
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const knex = Knex(knexConfig[ environment ]);

Model.knex(knex);
