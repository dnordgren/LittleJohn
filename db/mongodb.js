module.exports = mongoPool => {
  return {
    getLots(user) {
      return mongoPool
        .collection('lots')
        .find({ userId: user.id })
        .toArray()
        .then(lots => lots);
    },
  };
};
