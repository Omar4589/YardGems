const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allUsers: async () => {
      return User.find().populate('userPosts').populate('savedFavorites');
    },
    allPost: async () => {
      return Post.find();
    },
    post: async (parent, { listingId }) => {
      return Post.findOne({ _id: listingId });
    },
     // By adding context to our query, we can retrieve the logged in user without specifically searching for them
     me: async (parent, args, context) => {
       if (context.user) {
        const me = User.findById({_id: context.user._id}).populate('userPosts').populate('savedFavorites');
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
    addPost: async (parent, { postDescription, address, dateOfSale, image, postAuthor, postName, lat, lng}, context) => {
      if (context.user) {
        const newPost = await Post.create({
          postDescription, address, dateOfSale, image, postAuthor: context.user.username, postName,lat, lng
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { userPosts: newPost._id } }, 
          {new:true}
        );
        return newPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const removePost = await Post.findOneAndDelete({
          _id: postId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { userPosts: removePost._id } },
          {new:true}
        );
        return removePost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editPost: async (parent, {id, postDescription, address, dateOfSale, image, postName, lat, lng}, context) => {
      if (context.user) {
        const updatePost = await Post.findOneAndUpdate(
          { _id: id }, {postDescription, address, dateOfSale, image, postName,lat, lng}, {new:true}
        );
        return updatePost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addFavorites: async (parent, { postId }, context) => {
      if (context.user) {
        const favoritedPost = await Post.findOne({
          _id: postId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedFavorites: favoritedPost._id } },
          {new:true}
        );
        return favoritedPost ;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFavorites: async (parent, { postId }, context) => {
      if (context.user) {
        const removeFromFavorites = await Post.findOne({
          _id: postId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedFavorites: removeFromFavorites._id } },
          {new:true}
        );
        return removeFromFavorites ;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
