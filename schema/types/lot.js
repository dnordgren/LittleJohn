const {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const UserType = require('./user');

module.exports = new GraphQLObjectType({
  name: 'LotType',
  fields: {
    id: { type: GraphQLID },
    owner: { type: new GraphQLNonNull(UserType) }, // TODO
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    costBasis: { type: GraphQLFloat },
    shares: { type: GraphQLFloat },
    tradeDate: { type: GraphQLString },
    memo: { type: GraphQLString },
  },
});
