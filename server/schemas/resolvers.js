const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
     // By adding context to our query, we can retrieve the logged in user without specifically searching for them
     user: async (parent, args, context) => {
      // if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedPost');
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // create a user, sign a token, and send it back
    addUser: async (parent, { name, username, email, password }) => {
      const user = await User.create({ name, username, email, password });
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
    addPost: async (parent, { description, address, dateOfSale, image}, context) => {
      if (context.user) {
        const newPost = await Post.create({
          description, address, dateOfSale, image
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPost: newPost._id } }
        );

        return newPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
