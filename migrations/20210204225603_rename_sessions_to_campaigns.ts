'use strict';

import Knex from 'knex';

exports.up = (knex: Knex) => {
    return knex.schema
        .renameTable('sessions', 'campaigns')
        .then(() => {
            return knex.schema.table('campaigns', (campaignsTable) => {
                campaignsTable.dropColumn('session_key');
            });
        })
        .then(() => {
            return knex.schema.table('boards', (boardsTable) => {
                boardsTable.renameColumn('id_session', 'id_campaign');
            });
        });
};

exports.down = (knex: Knex) => {
    return knex.schema.renameTable('campaigns', 'sessions').then(() => {
        return knex.schema.table('boards', (boardsTable) => {
            boardsTable.renameColumn('id_campaign', 'id_session');
        });
    });
};
