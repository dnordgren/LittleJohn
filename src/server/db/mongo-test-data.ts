import { MongoClient } from "mongodb";
import * as assert from "assert";

import { nodeEnv } from "../util/nodeEnv";
import { IMongoConfig } from "../config/mongo";
const mongoConfig: IMongoConfig = require("../config/mongo")[nodeEnv];

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);
  db
    .collection("lots")
    .insertMany([
      {
        ownerId: 1,
        symbol: "MMM",
        costBasis: 200.00,
        shares: 10,
        tradeDate: "Sun Jan 01 2017 00:00:00 GMT-0600 (Central Daylight Time)",
        memo: "predicting strong earnings",
      },
      {
        ownerId: 1,
        symbol: "MMM",
        costBasis: 210.00,
        shares: 5,
        tradeDate: "Sun Jan 01 2017 00:00:00 GMT-0600 (Central Daylight Time)",
        memo: "broke out of cost basis",
      },
    ])
    .then((response: any) => {
      console.log(response);
      db.close();
    });
});
