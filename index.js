
const mongoose = require('mongoose')
const User = require('./schema')


const { ApolloServer, gql } = require('apollo-server');

mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const typeDefs = gql`
  type Query {
    getUser(id: String!): User,
    Users: [User],
    hello: String,
  }
  type Mutation {
    addUser(id: String!, name: String!, email: String!): User!
    updateEmail(id: String!, email: String!): User!
    deleteUser(id: String!): String!
  }
  type User {
    id: String,
    name: String,
    email: String,
  },
`;

const resolvers = {
    Query: {
        async getUser(parent, args, context, info) {
          return await User.findOne({ id: args.id });
        },
        async Users() {
          return await User.find({})
        },
        hello: () => 'Hello World',
    },
    Mutation: {
      async addUser(parent, args, context, info) {
          const user = new User({
              id: args.id,
              name: args.name,
              email: args.email
          })
          await user.save()
          return user
      },

      async updateEmail(parent, args) {
          return await User.findOneAndUpdate({ id: args.id }, { email: args.email }, { new: true })
      },
      async deleteUser(parent, args){
          await User.findOneAndDelete({ id: args.id })
          return 'Delete Success'
      }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 })
    .then(({ url }) => console.log(`Server running at ${url}`))