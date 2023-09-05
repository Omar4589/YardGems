const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const cloudinary = require("./utils/cloudinary");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
require("dotenv").config();

const multer = require("multer");
// Configure multer to use memory storage. This stores the uploaded files as buffers in memory.
const storage = multer.memoryStorage();
// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// This route below is responsible for uploading image(s).
// 'upload.single('file')' middleware looks for a field name 'file' in the incoming request.
// The file will be stored as a buffer in memory (RAM) rather than being written to disk.
// Once the file is processed, Multer attaches it to the req object as req.file.
app.post("/upload", upload.array("images", 5), async (req, res, next) => {
  try {
    console.log(req.body);
    const username = req.body.username; // Now you have the username

    let imageUrls = []; // Array to hold multiple image URLs

    for (const [index, file] of req.files.entries()) {
      const originalName = req.body.imageNames[index];
      const sanitizedImageName = originalName.replace(/[^a-zA-Z0-9]/g, "_");
      const uniqueFilename = `${username}_${new Date().toISOString()}_${sanitizedImageName}`;

      // Use a Promise to handle the Cloudinary upload.
      // We first call the promise so that we can 'listen' for a buffer stream.
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            // Configure Cloudinary upload options like folder and resource type.
            {
              folder: "yardgemsListings",
              resource_type: "image",
              public_id: uniqueFilename, // Set the public_id to your unique filename
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          // End the upload stream and send the file buffer.
          // This triggers the upload process and the subsequent resolution or rejection of the promise.
          .end(file.buffer);
      });
      // Push the secure URL to the imageUrls array
      imageUrls.push(result.secure_url);
    }

    // Send a message and the array of URLs
    res.json({ message: "Images uploaded successfully", imageUrls });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" }); // Send a more informative error response
  }
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
