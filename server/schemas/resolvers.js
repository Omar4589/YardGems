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
    updateUsername: async (parent, { newUsername }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { username: newUsername },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
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
    removeListing: async (parent, { listingId }, context) => {
      if (context.user) {
        const removeListing = await Listing.findOneAndDelete({
          _id: listingId,
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
    addFavorites: async (parent, { listingId }, context) => {
      if (context.user) {
        //find logged in user through context
        const user = await User.findOne({ _id: context.user._id });
        //if the listing we are trying to favorite is already in the savedFavorites array,
        if (user.savedFavorites.includes(listingId)) {
          //we remove the listing from the 'savedFavorites' array.
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedFavorites: listingId } },
            { new: true }
          );
          return user;
        }
        //else we run the code below which adds the listing to the 'savedFavorites' array
        const favoritedListing = await Listing.findOne({
          _id: listingId,
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
    removeFavorites: async (parent, { listingId }, context) => {
      if (context.user) {
        const removeFromFavorites = await Listing.findOne({
          _id: listingId,
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
