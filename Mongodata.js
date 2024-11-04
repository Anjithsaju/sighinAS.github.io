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

// Main function to establish database connection and run CRUD operations
async function main() {
  const db = await connectToDatabase();

  if (db) {
    console.log("Database connection established successfully.");
    const userData = {
      name: "Anjith",
      email: "anjith@example.com",
      password: "123456",
    };

    // Test CRUD functions
    await insertDocument(db, userData);
    /* await fetchDocuments(db);
    await updateDocument(
      db,
      { name: "Anjith" },
      { email: "updated@example.com" }
    );
    await deleteDocument(db, { name: "Anjith" });

    // Fetch a single user by name
    const userName = "Anjith";
    await fetchUserByName(db, userName);*/
  } else {
    console.log("Database connection failed.");
  }
}

// Insert a document
async function insertDocument(db, userData) {
  const collection = db.collection("users"); // Replace with your collection name
  const result = await collection.insertOne(userData);
  console.log(`New user created with the following id: ${result.insertedId}`);
}

// Fetch all documents (read)
async function fetchDocuments(db, query = {}) {
  const collection = db.collection("users");
  const users = await collection.find(query).toArray();
  console.log("Fetched users:", users);
  return users;
}

// Fetch a single user by name
async function fetchUserByName(db, name) {
  const collection = db.collection("users");
  const user = await collection.findOne({ name: name });

  if (user) {
    console.log("Fetched user:", user);
  } else {
    console.log("No user found with the name:", name);
  }
  return user;
}

// Update a document
async function updateDocument(db, query, newValues) {
  const collection = db.collection("users");
  const result = await collection.updateOne(query, { $set: newValues });

  if (result.modifiedCount > 0) {
    console.log("User updated successfully.");
  } else {
    console.log("No matching user found to update.");
  }
}

// Delete a document
async function deleteDocument(db, query) {
  const collection = db.collection("users");
  const result = await collection.deleteOne(query);

  if (result.deletedCount > 0) {
    console.log("User deleted successfully.");
  } else {
    console.log("No matching user found to delete.");
  }
}

// Run the main function
main();
