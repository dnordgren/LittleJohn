import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { IUser } from "./user";
import { IWatchlistPortfolioType } from "./watchlistPortfolioType";

export interface IWatchlist {
  id: string;
  title: string;
  description?: string;
  portfolioType: IWatchlistPortfolioType;
  createdAt?: string;
  owner: IUser;
}

export default new GraphQLObjectType({
  name: "WatchlistType",
  fields: () => {
    const UserType: GraphQLObjectType = require("./user");
    const WatchlistPortfolioType: GraphQLObjectType = require("./watchlistPortfolio");
    return {
      id: { type: GraphQLID },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      portfolioType: { type: new GraphQLNonNull(WatchlistPortfolioType) },
      createdAt: { type: GraphQLString },
      owner: {
        type: new GraphQLNonNull(UserType),
        resolve(obj: any, args: Array<string>, { loaders }: { loaders: any } ): any {
          return loaders.usersByIds.load(obj.ownerId);
        },
      },
    };
  },
});
