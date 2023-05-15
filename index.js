import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const app = express();
app.use(cors());

//workaround for applyMiddlware
let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(4000, function () {
  console.log(`server running on port 4000`);
  console.log(`gql path is ${apolloServer.graphqlPath}`);
});