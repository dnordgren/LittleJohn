import {
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { IUser } from "./user";

export interface ILot {
  id: string;
  owner: IUser;
  symbol: string;
  costBasis: number;
  shares: number;
  tradeDate: string;
  memo: string;
}

export default new GraphQLObjectType({
  name: "LotType",
  fields: () => {
    const UserType: GraphQLObjectType = require("./user");
    return {
      id: { type: GraphQLID },
      owner: {
        type: new GraphQLNonNull(UserType),
        resolve(obj: any, args: Array<string>, { loaders }: { loaders: any } ): any {
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
