import { withFilter } from 'graphql-subscriptions';

const blogs = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    blogs: () => {
      return {
        errors: [],
        blogs: blogs
      }
    },
    blog: (_, { blogId }) => {
      const blog = blogs.find(b => b.id === parseInt(blogId));
      if (!blog) {
        return {
          errors: [`Blog with id ${blogId} not found`],
          blog: null
        }
      }
      return {
        errors: [],
        blog
      }
    },
  },
  Mutation: {
    createBlog: (_, { title, author }) => {
      blogs.push({
        id: blogs.length + 1,
        title,
        author,
      });
      return {
        errors: [],
        id: blogs.length,
      }
    },
  },
  Subscription: {
    newBlog: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['NEW_BLOG']),
        (payload, variables) => {
          return true;
        },
      ),
      resolve: payload => {
        return {
          errors: [],
          id: payload.blogId,
        }
      },
    },
  },
};

export default resolvers;
