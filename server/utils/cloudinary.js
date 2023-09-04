const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const cloudinary = require("cloudinary").v2;

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const secret = process.env.SECRET_ACCESS_KEY;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: secret,
});

module.exports = cloudinary;
