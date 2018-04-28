const { GraphQLServer } = require('graphql-yoga')

let linksDummyData = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = linksDummyData.length
const resolvers = {
  Query: {
    info: () => 'This is the API ',
    feed: () => linksDummyData
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      linksDummyData.push(link)

      return link
    },
    updateLink: (root, args) => {
      console.log('updateLink', args)
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))

