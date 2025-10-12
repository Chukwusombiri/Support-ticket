const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/**
 * Connect once and reuse across app
 */

let db;

const connectDB = async () => {
    try {
        if (!db) {
            await client.connect();
            console.log("MongoDB connected!");
            db = client.db("support_desk"); // You can pass db name: client.db("mydbname")
        }    
        
        return db
    }
    catch (error) {
        console.log("Mongo connect failed");
        process.exit(1);
    }
}

// Graceful shutdown hook
const shutdown = async (signal) => {
  console.log(`\n📴 ${signal} received: closing MongoDB connection...`);
  try {
    await client.close();
    console.log("✅ MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error closing MongoDB", err);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));   // e.g. CTRL+C
process.on("SIGTERM", () => shutdown("SIGTERM")); // e.g. kill command in prod

module.exports = { connectDB, client };
