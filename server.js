// require('dotenv').config();

// console.log(process.env.MONGO_URI);

// // Import required dependencies
// const express = require('express');  // Express framework
// const mongoose = require('mongoose');  // Mongoose for MongoDB connection
// const cors = require('cors');  // Middleware to enable cross-origin resource sharing
// require('dotenv').config();  // Load environment variables from .env file

// // Create an Express app
// const app = express();

// // Middleware to parse incoming requests with JSON payloads
// app.use(express.json());
// app.use(cors());  // Use CORS to handle cross-origin requests

// // MongoDB connection using Mongoose
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => console.log(err));

// // Simple route to verify server is running
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// // Port from environment variables or default to 3000
// const PORT = process.env.PORT || 3000;

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aatif:112096@resumedb.munl4.mongodb.net/?retryWrites=true&w=majority&appName=resumeDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
