const typeDefs = `
type Book {
    _id: ID!
    authors: String
    description: String!
    bookID: String!
    image: String
    link: String
    title: String!
}
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
}
type Auth {
    token: ID!
    user: User
}
type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(user: $user, body: $book): User
    deleteBook(bookId: ID!): User
}

`
// ELSIE NOTES/Qs
// Book.bookID --> saved book id from GoogleBooks
// Does it need to be refered to differently?



module.exports = typeDefs
