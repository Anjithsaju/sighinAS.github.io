const { MongoClient } = require("mongodb");

// Replace with your MongoDB Atlas connection string

const uri =
  "mongodb+srv://anjithsaju123:Iameditor2.0@anjithsaju.lzvvo2m.mongodb.net/Sign-in?retryWrites=true&w=majority&tls=true&tlsInsecure=true";

// Create a new MongoClient instance without deprecated options
const client = new MongoClient(uri);
console.log("hi");
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Access your database here
    const db = client.db("Sign-in");

    // Return the database object
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
  }
}

module.exports = connectToDatabase;
