const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const pgdb = require('../../db/pgdb');
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
        resolve(obj, args, { pgPool } ) {
          return pgdb(pgPool).getUserById(obj.ownerId);
        },
      },
    };
  },
});
