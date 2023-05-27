import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    author: String!
  }  

  type Query {
    getBlogs(query: String):[Blog!]!
    getBlog(id: ID!): Blog!
  }

  type Mutation {
    createBlog(title: String!, author: String!): Blog!
    updateBlog(id: ID!, title: String!, author: String!): Blog!
    deleteBlog(id: ID!): Blog!
  }

  type Subscription {
    blog: Blog!
  }
`

export default typeDefs