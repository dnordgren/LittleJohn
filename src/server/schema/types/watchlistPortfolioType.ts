import { GraphQLEnumType } from "graphql";

export interface IWatchlistPortfolioType {
  value: "investment" | "speculative" | "crypocurrency" | "mixed";
}

export default new GraphQLEnumType({
  name: "WatchlistPortfolioType",
  values: {
    INVESTMENT: { value: "investment" },
    SPECULATIVE: { value: "speculative" },
    CRYPTOCURRENCY: { value: "crypocurrency" },
    MIXED: { value: "mixed" },
  },
});
