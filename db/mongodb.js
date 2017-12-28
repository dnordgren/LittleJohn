module.exports = mongoPool => {
  return {
    getLots(user) {
      return mongoPool
        .collection('lots')
        .find({ ownerId: user.id })
        .toArray()
        .then(lots => lots);
    },
  };
};
