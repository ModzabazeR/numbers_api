const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");

const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use("/graphql", cors(), json(), expressMiddleware(server));

  const PORT = 3001;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
}

startApolloServer().catch((err) => {
  console.error("Failed to start Apollo Server", err);
});
