const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const pgdb = require('../../db/pgdb');
const mongodb = require('../../db/mongodb');

const WatchlistType = require('./watchlist');
const LotType = require('./lot');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    watchlists: {
      type: new GraphQLList(WatchlistType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getWatchlists(obj);
      },
    },
    lots: {
      type: new GraphQLList(LotType),
      resolve(obj, args, { mongoPool }) {
        return mongodb(mongoPool).getLots(obj);
      },
    },
  },
});
