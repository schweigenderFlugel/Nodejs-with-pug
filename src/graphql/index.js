const { ApolloServer } = require('apollo-server-express');
const { loadFiles } = require('@graphql-tools/load-files');
const resolvers = require('./resolvers');

const useGraphQL = async (app) => {
  const typeDefs = await loadFiles('./src/**/*.graphql')

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  await server.start();
  server.applyMiddleware({ app });
}

module.exports = useGraphQL;