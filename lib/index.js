const ljSchema = require('../schema');
const { graphql } = require('graphql');

// Read the query from command line arguments.
const query = process.argv[2];

graphql(ljSchema, query).then(result => {
  console.log(result);
});
