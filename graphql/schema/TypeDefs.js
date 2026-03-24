const typeDefs = `#graphql

  type Number {
    math: [String!]!
    trivia: [String!]!
    date: [String!]!
    year: [String!]!
  }

  # Queries
  type Query {
    getNumberFacts(number: Int!): Number!
  }
  
`;

module.exports = { typeDefs };
