// Init reading from .env file.
require('dotenv').config();

// Init the HTTP server.
const app = require('express')();

const graphqlHttp = require('express-graphql');
const { nodeEnv } = require('./util');

const ljSchema = require('../schema');

const DataLoader = require('dataloader');
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../db/pgdb')(pgPool);

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mongoConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mongoConfig.url, (err, mongoPool) => {
  assert.equal(err, null);

  app.use('/graphql', (req, res) => {
    // initialize data loaders on a per-request basis (not globally)
    const loaders = {
      usersByIds: new DataLoader(pgdb.getUsersByUserIds),
      usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
      watchlistsForUserIds: new DataLoader(pgdb.getWatchlistsForUserIds),
    };
    graphqlHttp({
      schema: ljSchema,
      graphiql: true,
      context: { pgPool, mongoPool, loaders }
    })(req, res);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
