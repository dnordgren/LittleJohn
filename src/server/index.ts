// init reading from .env file.
require("dotenv").config();

import * as express from "express";
import * as assert from "assert";
import * as graphqlHttp from "express-graphql";
import * as DataLoader from "dataloader";
import * as pg from "pg";
import { MongoClient } from "mongodb";

import ljSchema from "./schema";
import { nodeEnv } from "./util/nodeEnv";
import { pgdb, ILittleJohnPgClient } from "./db/pgdb";
import { mongodb, ILittleJohnMongoClient } from "./db/mongodb";
import { IMongoConfig } from "./config/mongo";

// init the HTTP server.
const app: Express.Application = express();

const pgConfig: pg.PoolConfig = require("./config/pg")[nodeEnv];
const pgPool: pg.Pool = new pg.Pool(pgConfig);
const pgClient: ILittleJohnPgClient = pgdb(pgPool);

const mongoConfig: IMongoConfig = require("../config/mongo")[nodeEnv];
MongoClient.connect(mongoConfig.url, (err, mongoPool) => {
  assert.equal(err, null);

  const mongoClient: ILittleJohnMongoClient = mongodb(mongoPool);

  app.use("/graphql", (req: Express.Request, res: Express.Response) => {
    // initialize data loaders on a per-request basis (not globally)
    const loaders: Object = {
      usersByIds: new DataLoader(pgClient.getUsersByUserIds),
      usersByApiKeys: new DataLoader(pgClient.getUsersByApiKeys),
      watchlistsForUserIds: new DataLoader(pgClient.getWatchlistsForUserIds),
      lotsForUserIds: new DataLoader(mongoClient.getLotsForUserIds),
    };
    graphqlHttp({
      schema: ljSchema,
      graphiql: true,
      context: { pgPool, mongoPool, loaders }
    })(req, res);
  });

  const PORT: string = process.env.PORT || "3000";
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
