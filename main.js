const express = require("express");
const cors = require("cors"); // Import the CORS package

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data in requests
app.use(express.json());
const { MongoClient } = require("mongodb");

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

    // Access your database
    const db = client.db("Sign-in");

    // Return the database object
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
  }
}

async function main() {
  const db = await connectToDatabase();
  if (db) {
    console.log("Database connection established successfully.");
    return db;
  } else {
    console.log("Database connection failed.");
    throw new Error("Failed to connect to the database.");
  }
}

async function insertDocument(db, userData) {
  const collection = db.collection("users"); // Replace with your collection name
  const result = await collection.insertOne(userData);
  return result.insertedId;
}

// Define /insert route
app.post("/insert", async (req, res) => {
  const db = await main();

  if (!db) {
    return res.status(500).json({ error: "Database connection failed." });
  }

  const userData = req.body;
  try {
    const insertedId = await insertDocument(db, userData);
    res.json({ message: "User inserted successfully.", id: insertedId });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Failed to insert user." });
  }
});

async function fetchUserByNameAndPassword(db, name, password) {
  const collection = db.collection("users");
  const user = await collection.findOne({ userid: name, password: password });

  return !!user; // Return true if user exists, false if not
}

// Fetching and checking
app.post("/fetchUserByName", async (req, res) => {
  const db = await main();
  if (!db) {
    return res.status(500).json(false);
  }

  const { name, password } = req.body;

  try {
    const isValidUser = await fetchUserByNameAndPassword(db, name, password);
    console.log(isValidUser);
    res.json(isValidUser); // Directly return true or false
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json(false); // Return false in case of error
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
