module.exports = {
  development: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: 'watchlists',
  },
};
