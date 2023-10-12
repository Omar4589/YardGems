const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const listingSchema = new Schema({
  description: {
    type: String,
    required: "You need to leave a description!",
    minlength: 1,
    maxlength: 3000,
    trim: true,
  },
  address: {
    type: String,
    required: [
      true,
      "Please enter an address",
    ],
    trim: true,
  },
  // date to hold the sell for buyers
  dateOfSale: {
    type: String,
    required: [true, "Enter a date"],
  },
  images: {
    type: [String],  // Changed from String to an array of strings
    default: [] 
  },
  author: {
    type: String,
    trim: true,
    required [true, "an author is required"],
  },
  title: {
    type: String,
    minlength: 1,
    maxlength: 50,
    trim: true,
    required: [true, "Enter a title"],
  },
  lat: {
    type: Number, // maybe  aflloat
  },
  lng: {
    type: Number,
  },

  // date of when the user create a sale post
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Listing = model("Listing", listingSchema);

module.exports = Listing;
