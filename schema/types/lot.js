const {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'LotType',
  fields: () => {
    const UserType = require('./user');
    return {
      id: { type: GraphQLID },
      owner: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, { loaders } ) {
          return loaders.usersByIds.load(obj.ownerId);
        },
      },
      symbol: { type: new GraphQLNonNull(GraphQLString) },
      costBasis: { type: GraphQLFloat },
      shares: { type: GraphQLFloat },
      tradeDate: { type: GraphQLString },
      memo: { type: GraphQLString },
    };
  },
});
