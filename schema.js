import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    author: String!
  }

  type BlogResult {
    errors: [String]
    blog: Blog
  }

  type BlogsResult {
    errors: [String]
    blogs: [Blog]
  }

  type InsertResult {
    errors: [String]
    id: ID
  }

  type Query {
    blogs: BlogsResult!
    blog(blogId: ID!): BlogResult!
  }

  type Mutation {
    createBlog(title: String!, author: String!): InsertResult!
  }

  type Subscription {
    newBlog: Blog
  }
`

export default typeDefs