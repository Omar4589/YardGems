const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allUsers: async () => {
      return User.find().populate('savedPost');
    },
    allPost: async () => {
      return Post.find();
    },
     // By adding context to our query, we can retrieve the logged in user without specifically searching for them
     me: async (parent, args, context) => {
       if (context.user) {
        const me = User.findOne({_id: context.user._id}).populate('savedPost');
        return me
       }
       throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // create a user, sign a token, and send it back
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // login a user, sign a token, and send it back
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this information found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, { description, address, dateOfSale, image, postAuthor, postName}, context) => {
      if (context.user) {
        const newPost = await Post.create({
          description, address, dateOfSale, image, postAuthor: context.user.username, postName
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedPost: newPost._id } } // or would it be push
        );

        return newPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
