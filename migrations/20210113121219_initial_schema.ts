'use strict';

import Knex from 'knex';

exports.up = (knex: Knex) => {
    return knex.schema
        .createTable('tokens', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('asset_url');
            table.integer('position_x');
            table.integer('position_y');
            table.integer('id_session');
        })
        .createTable('sessions', (table) => {
            table.increments('id').primary();
        });
};

exports.down = (knex: Knex) => {
    return knex.schema.dropTableIfExists('tokens').dropTableIfExists('sessions');
};
