import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { ILot } from "./lot";
import { IWatchlist } from "./watchlist";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  watchlists: Array<IWatchlist>;
  lots: Array<ILot>;
}

export default new GraphQLObjectType({
  name: "UserType",
  fields: () => {
    const WatchlistType: GraphQLObjectType = require("./watchlist");
    const LotType: GraphQLObjectType = require("./lot");

    return {
      id: { type: GraphQLID },
      email: { type: new GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      watchlists: {
        type: new GraphQLList(WatchlistType),
        resolve(obj: any, args: Array<string>, { loaders }: { loaders: any } ): any {
          return loaders.watchlistsForUserIds.load(obj.id);
        },
      },
      lots: {
        type: new GraphQLList(LotType),
        resolve(obj: any, args: Array<string>, { loaders }: { loaders: any } ): any {
          return loaders.lotsForUserIds.load(obj.id);
        },
      },
    };
  },
});
