const blogs = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    completed: false,
    ownerId: 1
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
    completed: false,
    ownerId: 1
  },
];

const users = [
  {
    id: 1,
    email: 'test@test.com',
    password: 'test'
  }
];

const tokens = [
  {
    id: 1,
    email: '',
    password: '',
    token: 'test',
  }
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
        completed: false,
        ownerId: 1
      });
      return {
        errors: [],
        id: blogs.length,
      }
    },
    createUser: (_, { email, password }) => {
      users.push({
        id: users.length + 1,
        email,
        password
      });
      return {
        errors: [],
        id: users.length,
      }
    },
    createToken: (_, { email, password }) => {
      tokens.push({
        id: tokens.length + 1,
        email,
        password,
        token: 'test'
      });
      return {
        errors: [],
        /* token: tokens[tokens.length - 1] */
      }
    },
  },
  Subscription: {
    reviewBlog: {
      subscribe: (_, { token }) => {

        return {
          errors: [],
          id: null
        }
      },
    },
  },
};

export default resolvers