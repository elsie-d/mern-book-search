const {Book, User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
       
        user: async () => {
            const params = _id ? {_id} : {}
            return User.find(params)
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            
            if (!user){
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError
            }
            const token = signToken(user);

            return {token, user}
        },
        // Help
        saveBook: async (parent, {user, body} ) => {
            return User.findOneAndUpdate(
                {username: user},
                // Unsure of this set up
                {$addToSet: {bookID: body}}

            );
            return {new: true}
        }
    }
}