// Init reading from .env file.
require('dotenv').config();

const graphqlHttp = require('express-graphql');
const { nodeEnv } = require('./util');

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

const ljSchema = require('../schema');

// Init the HTTP server.
const app = require('express')();

app.use(
  '/graphql',
  graphqlHttp({
    schema: ljSchema,
    graphiql: true,
    context: {
      pgPool,
    },
  })
);

const PORT = process.env.APPPORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
