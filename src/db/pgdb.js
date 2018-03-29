const { orderedFor } = require('../lib/util');

module.exports = pgPool => ({
  getUsersByUserIds(userIds) {
    return pgPool
      .query(
        `
          SELECT * FROM users
          WHERE id = ANY($1)
        `,
        [userIds]
      )
      .then(res => orderedFor(res.rows, userIds, 'id', true));
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
      .then(res => orderedFor(res.rows, apiKeys, 'apiKey', true));
  },
  getWatchlistsForUserIds(userIds) {
    return pgPool
      .query(
        `
          SELECT * FROM lists
          WHERE owner_id = ANY($1)
        `,
        [userIds]
      )
      .then(res => orderedFor(res.rows, userIds, 'ownerId', false));
  },
});
