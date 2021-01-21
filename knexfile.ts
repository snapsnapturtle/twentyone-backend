export default {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './local.db',
        },
        pool: {
            afterCreate: (conn: any, cb: any) => {
                conn.run('PRAGMA foreign_keys = ON', cb);
            },
        }
    },
    production: {
        client: 'pg',
        connection: {
            uri: process.env.DATABASE_URL,
            ssl: true
        }
    }
};
