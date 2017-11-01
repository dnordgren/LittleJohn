const { MongoClient } = require('mongodb');
const assert = require('assert');
const mongoConfig = require('../config/mongo')[
  process.env.NODE_ENV || 'development'
];

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);

  db
    .collection('lots')
    .insertMany([
      {
        symbol: 'MMM',
        costBasis: 200.00,
        shares: 10,
        tradeDate: 'Sun Jan 01 2017 00:00:00 GMT-0600 (Central Daylight Time)',
        memo: 'predicting strong earnings',
      },
      {
        symbol: 'MMM',
        costBasis: 210.00,
        shares: 5,
        tradeDate: 'Sun Jan 01 2017 00:00:00 GMT-0600 (Central Daylight Time)',
        memo: 'broke out of cost basis',
      },
    ])
    .then(response => {
      console.log(response);
      db.close();
    });
});
