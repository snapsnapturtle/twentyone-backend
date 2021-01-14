'use strict';

exports.up = (knex) => {
    return knex.schema
        .createTable('tokens', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('asset_url');
            table.integer('position_x');
            table.integer('position_y');
            table.integer('id_session');
        })
        .createTable('sessions', table => {
            table.increments('id').primary();
            table.string('session_key');
        });
};

exports.down = (knex) => {
    return knex.schema
        .dropTableIfExists('tokens')
        .dropTableIfExists('sessions');
};
