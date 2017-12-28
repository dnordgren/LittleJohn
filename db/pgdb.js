const humps = require('humps');
const _ = require('lodash');

module.exports = pgPool => {
  // TODO move to util class, add tests
  const orderedFor = (rows, collection, field) => {
    const normalizedRows = humps.camelizeKeys(rows);

    // build a dictionary of field : values of field from each row to yield constant-time search
    const inGroupsByField = _.groupBy(normalizedRows, field);

    // return the rows ordered for the collection to satisfy dataloader
    return collection.map(element => {
      const elementArray = inGroupsByField[element];
      return !!elementArray ? elementArray[0] : {};
    });
  };

  return {
    getUsersByIds(userIds) {
      return pgPool
        .query(
          `
            SELECT * FROM users
            WHERE id = ANY($1)
          `,
          [userIds]
        )
        .then(res => orderedFor(res.rows, userIds, 'id'));
    },
    getUsersByApiKeys(apiKeys) {
      return pgPool
        .query(
          `
            SELECT * FROM users
            WHERE api_key = ANY($1)
          `,
          [apiKeys]
        )
        .then(res => orderedFor(res.rows, apiKeys, 'apiKey'));
    },
    getWatchlists(user) {
      return pgPool
        .query(
          `
            SELECT * FROM lists
            WHERE owner_id = $1
          `,
          [user.id]
        )
        .then(res => humps.camelizeKeys(res.rows));
    },
  };
};
