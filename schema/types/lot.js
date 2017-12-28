const {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'LotType',
  fields: {
    id: { type: GraphQLID },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    costBasis: { type: GraphQLFloat },
    shares: { type: GraphQLFloat },
    tradeDate: { type: GraphQLString },
    memo: { type: GraphQLString },
  },
});
