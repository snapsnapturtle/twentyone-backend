'use strict';

import Knex from 'knex';

exports.up = (knex: Knex) => {
    return knex.schema
        .createTable('boards', (table) => {
            table.increments('id').primary();
            table.integer('id_session');
            table.string('name');
            table.integer('width');
            table.integer('height');
            table.integer('grid_type');
            table.string('grid_line_color');
        });
};

exports.down = (knex: Knex) => {
    return knex.schema.dropTableIfExists('boards');
};
