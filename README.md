# LittleJohn :bow_and_arrow:
Web portfolio management tool to complement Robinhood.

## Attributions
S/o to [this great Pluralsight course](https://app.pluralsight.com/library/courses/graphql-scalable-apis) on building APIs with GraphQL for a lot of the stuff in here so far.

## Local development

### Run all the servers
- Run local server with `npm run dev`
- Run PostgreSQL locally via `psql -U postgres`
- Run MongoDB locally via `mongod`

### Scaffold data
- Scaffold SQL data via `psql -U postgres < ./db/pg-test-data.sql` (need to use Powershell-friendly redirection on Windows)
- Scaffold Mongo data via `node ./db/mongo-test-data.js` (assuming `mongod` is running)

### Tooling
Recommend TeamSQL as Postgres client & Robo 3T as Mongo client.

### Demo
Check out `/graphql` to inspect the GraphQL schema in GraphiQL.