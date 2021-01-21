module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './local.db'
        },
        pool: {
            afterCreate: (conn: any, cb: any) => {
                conn.run('PRAGMA foreign_keys = ON', cb);
            }
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }
};
