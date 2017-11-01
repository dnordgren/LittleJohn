module.exports = mongoPool => {
  return {
    get(user) {
      return mongoPool
        .collection('lots')
        .find({ userId: user.id })
        .then(lot => lot);
    },
  };
};
