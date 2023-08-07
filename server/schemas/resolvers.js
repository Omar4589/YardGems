const { AuthenticationError } = require("apollo-server-express");

const { User, Listing } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allUsers: async () => {
      return await User.find().populate("userPosts").populate("savedFavorites");
    },
    allListings: async () => {
      return await Listing.find();
    },
    listing: async (parent, { listingId }) => {
      return await Listing.findOne({ _id: listingId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const me = await User.findById({ _id: context.user._id })
          .populate("userPosts")
          .populate("savedFavorites");
        return me;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    addListing: async (
      parent,
      { description, address, dateOfSale, image, author, title, lat, lng },
      context
    ) => {
      if (context.user) {
        const newListing = await Listing.create({
          description,
          address,
          dateOfSale,
          image,
          author: context.user.username,
          title,
          lat,
          lng,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { userPosts: newListing._id } },
          { new: true }
        );
        return newListing;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeListing: async (parent, { ListingId }, context) => {
      if (context.user) {
        const removeListing = await Listing.findOneAndDelete({
          _id: ListingId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { userPosts: removeListing._id } },
          { new: true }
        );
        return removeListing;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editListing: async (
      parent,
      { id, description, address, dateOfSale, image, title, lat, lng },
      context
    ) => {
      if (context.user) {
        const updateListing = await Listing.findOneAndUpdate(
          { _id: id },
          { description, address, dateOfSale, image, title, lat, lng },
          { new: true }
        );
        return updateListing;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFavorites: async (parent, { ListingId }, context) => {
      if (context.user) {
        const favoritedListing = await Listing.findOne({
          _id: ListingId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedFavorites: favoritedListing._id } },
          { new: true }
        );
        return favoritedListing;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFavorites: async (parent, { ListingId }, context) => {
      if (context.user) {
        const removeFromFavorites = await Listing.findOne({
          _id: ListingId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedFavorites: removeFromFavorites._id } },
          { new: true }
        );
        return removeFromFavorites;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
