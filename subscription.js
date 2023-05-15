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

function getAllBlogs() {
  const query = `
    query {
      blogs {
        blogs {
          id
          title
          author
        }
      }
    }
  `;

  client.query(query).toPromise().then(result => {
    const blogs = result.data.blogs.blogs;
    blogs.forEach((blog) => {
      const blogDiv = document.createElement("div");
      blogDiv.innerHTML = `
          <h3>title: ${blog.title}</h3>
          <p>author: ${blog.author}</p>
          `;
      blogsDiv.appendChild(blogDiv);
    });
  });

  const subscriptionQuery = `
    subscription {
      reviewBlog {
        id
        title
        author
      }
    }
  `;

  const subscription = client.subscription(subscriptionQuery);

  subscription.subscribe(({ data }) => {
    const newBlog = data.reviewBlog;
    const blogDiv = document.createElement("div");
    blogDiv.innerHTML = `
          <h3>title: ${newBlog.title}</h3>
          <p>author: ${newBlog.author}</p>
          `;
    blogsDiv.appendChild(blogDiv);
  });
}

getAllBlogs();