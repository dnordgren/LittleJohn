const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
  name: 'WatchlistPortfolioType',
  values: {
    INVESTMENT: { value: 'investment' },
    SPECULATIVE: { value: 'speculative' },
    CRYPTOCURRENCY: { value: 'crypocurrency' },
    MIXED: { value: 'mixed' },
  },
});
