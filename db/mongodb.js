const { orderedFor } = require('../lib/util');

module.exports = mongoPool => ({
  getLotsForUserIds(userIds) {
    return mongoPool
      .collection('lots')
      .find({ ownerId: { $in: userIds } })
      .toArray()
      .then(rows => orderedFor(rows, userIds, 'ownerId', false));
  },
});
