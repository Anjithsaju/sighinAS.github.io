//npm install express cors mongodb

const express = require("express");
const cors = require("cors"); // Import the CORS package
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data in requests
app.use(express.json());

// MongoDB Atlas connection string
const uri =
  "mongodb+srv://anjithsaju123:Iameditor2.0@anjithsaju.lzvvo2m.mongodb.net/Sign-in?retryWrites=true&w=majority&tls=true&tlsInsecure=true";

// Create a new MongoClient instance
const client = new MongoClient(uri);

// Function to connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Access your database and return it
    return client.db("Sign-in");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
    throw new Error("Failed to connect to database.");
  }
}

// Define /insert route
app.post("/insert", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const userData = req.body;
    const collection = db.collection("users");

    const result = await collection.insertOne(userData);
    res.json({ message: "User inserted successfully.", id: result.insertedId });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to insert user." });
  }
});

// Define /fetchUserByName route
app.post("/fetchUserByName", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { name, password } = req.body;
    const collection = db.collection("users");

    const user = await collection.findOne({ userid: name, password: password });
    const isValidUser = !!user; // Check if user exists
    res.json(isValidUser); // Return true or false
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json(false); // Return false in case of error
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
