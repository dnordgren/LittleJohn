const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const WatchlistPortfolioType = require('./watchlistPortfolio');

module.exports = new GraphQLObjectType({
  name: 'WatchlistType',
  fields: () => {
    const UserType = require('./user');
    return {
      id: { type: GraphQLID },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      portfolioType: { type: new GraphQLNonNull(WatchlistPortfolioType) },
      createdAt: { type: GraphQLString },
      owner: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, { loaders } ) {
          return loaders.usersByIds.load(obj.ownerId);
        },
      },
    };
  },
});
