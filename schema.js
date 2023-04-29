import { gql } from "apollo-server-express";
//   !  is used for make field mandatory

const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [QuoteWithName]
    user(_id: ID!): User
    iquote(by: ID!): [Quote]
    myprofile: User
  }
  type QuoteWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: String
    firstName: String
  }
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    quotes: [Quote]
  }

  type Quote {
    name: String!
    by: ID!
  }

  type Token {
    token: String!
  }

  type Mutation {
    signUpUser(userNew: UserInput!): User
    signInUser(userSignIn: UserSignInInput!): Token
    createQuote(name: String): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSignInInput {
    email: String!
    password: String!
  }
`;
export default typeDefs;
