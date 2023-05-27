const blogs = [
  {
    id: 1,
    title: 'The Shining',
    author: 'Stephen King',
  },
  {
    id: 2,
    title: 'Lord of the Rings: The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
  },
];

const resolvers = {
  Query: {
    getBlogs() {
      return blogs
    },
    getBlog: (_, { id }) => {
      const blog = blogs.find(blog => blog.id === parseInt(id));
      if (!blog) {
        return {
          errors: [`Blog with id ${id} not found`],
          blog: null
        }
      }
      return blog
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
        id: blogs.length,
        title: title,
        author: author,
      }
    },
    updateBlog: (_, { id, title, author }) => {
      const blog = blogs.find(blog => blog.id === parseInt(id));
      if (!blog) {
        throw new Error(`Blog with id ${id} not found`)
      }
      const updatedBlog = {
        id: blog.id,
        title: title,
        author: author,
      };

      const blogIndex = blogs.findIndex(blog => blog.id === parseInt(id));
      blogs[blogIndex] = updatedBlog;
      return {
        id: updatedBlog.id,
        title: updatedBlog.title,
        author: updatedBlog.author,
      }
    },
    deleteBlog: (_, { id }) => {
      const blog = blogs.find(blog => blog.id === parseInt(id));
      if (!blog) {
        throw new Error(`Blog with id ${id} not found`)
      }
      const blogIndex = blogs.findIndex(blog => blog.id === parseInt(id));
      blogs.splice(blogIndex, 1);
      return {
        id: blog.id,
        title: blog.title,
        author: blog.author,
      }
    },
  },
  Subscription: {
    blog: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('blog')
    }
  },
};

export default resolvers;