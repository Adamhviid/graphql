import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphQL/typeDefs.js';
import resolvers from './graphQL/resolvers.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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


//SMS
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const formData = new FormData();
  formData.append("user_email", email);
  formData.append("user_password", password);

  await fetch("https://fiotext.com/login", {
    method: "POST",
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.post('/register', async (req, res) => {
  const { email, phone, password, confirmPassword } = req.body;

  const formData = new FormData();
  formData.append("user_email", email);
  formData.append("user_phone", phone);
  formData.append("user_password", password);
  formData.append("user_password_confirm", confirmPassword);

  await fetch("https://fiotext.com/sign-up", {
    method: "POST",
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
})

app.post('/send', async (req, res) => {
  const { user_api_key, sms_to_phone, sms_message } = req.body;

  const formData = new FormData();
  formData.append("user_api_key", user_api_key);
  formData.append("sms_to_phone", sms_to_phone);
  formData.append("sms_message", sms_message);

  await fetch("https://fiotext.com/send-sms", {
    method: "POST",
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    })
})

app.listen(4000, function () {
  console.log(`server running on port 4000`);
  console.log(`gql path is ${apolloServer.graphqlPath}`);
});