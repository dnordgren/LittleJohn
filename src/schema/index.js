const {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const UserType = require('./types/user');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => {
    return {
      user: {
        type: UserType,
        description: '', // TODO
        args: {
          apiKey: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (obj, args, { loaders }) => {
          return loaders.usersByApiKeys.load(args.apiKey);
        },
      },
    };
  },
});

const ljSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = ljSchema;
