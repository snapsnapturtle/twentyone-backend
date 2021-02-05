'use strict';

import Knex from 'knex';

exports.up = (knex: Knex) => {
    return knex.schema.alterTable('campaigns', (tableBuilder) => {
        tableBuilder.string('name');
    });
};

exports.down = (knex: Knex) => {
    return knex.schema.alterTable('campaigns', (tableBuilder) => {
        tableBuilder.dropColumn('name');
    });
};
