const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const pgdb = require('../db/pgdb');

const UserType = require('./types/user');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      description: '', // TODO
      args: {
        apiKey: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, { pgPool }) => {
        return pgdb(pgPool).getUserByApiKey(args.apiKey);
      },
    },
  },
});

const ljSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = ljSchema;
