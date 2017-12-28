const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const UserType = require('./user');
const WatchlistPortfolioType = require('./watchlistPortfolio');

module.exports = new GraphQLObjectType({
  name: 'WatchlistType',
  fields: {
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    portfolioType: { type: new GraphQLNonNull(WatchlistPortfolioType) },
    createdAt: { type: GraphQLString },
    owner: { type: new GraphQLNonNull(UserType) }, // TODO
  },
});
