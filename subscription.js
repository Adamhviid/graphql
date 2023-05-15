import { createClient, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient('ws://localhost:4000/graphql', {
  reconnect: true
});

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation)
    })
  ]
});

export default client;