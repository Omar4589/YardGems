const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Please enter a password that contains 8 or more characters'],
    },
    userPosts: [
      { // referrances the Post table to the id
        type: Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
    savedFavorites: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `postCount` with the number of saved post a user has created for holding a sell
userSchema.virtual('listingCount').get(function () {
  return this.userPosts.length;
});


const User = model("User", userSchema);

module.exports = User;
