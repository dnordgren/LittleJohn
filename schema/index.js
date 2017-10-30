const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world',
    },
  },
});

const ljSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = ljSchema;
