const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  description: {
    type: String,
    required: 'You need to leave a description!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please enter address where you would like to hold your Yard Gems'],
    trim: true,
  },
  // date to hold the sell for buyers
  dateOfSale: {
    type: String,
    required: [true,'Enter a date to hold the sale'],
  },
  image: {
    type: String,
    required: [true, 'Leave an image of the the sale or particular item']
  }, 
  postAuthor: {
    type: String,
  },
  // date of when the user create a sale post
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});


const Post = model('Post', postSchema);

module.exports = Post;
