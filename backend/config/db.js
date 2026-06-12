const mongoose = require("mongoose");

let MongoMemoryServer;
try {
  MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
} catch (e) {
  MongoMemoryServer = null;
}

const connectDB = async () => {
  const envUri = process.env.MONGO_URI;

  try {
    // If an environment URI is provided, try it first but don't exit on failure
    if (envUri && (envUri.startsWith("mongodb://") || envUri.startsWith("mongodb+srv://"))) {
      try {
        await mongoose.connect(envUri);
        console.log("MongoDB Connected (env MONGO_URI)");
        return;
      } catch (envErr) {
        console.warn("Failed to connect using MONGO_URI:", envErr.message);
        console.warn("Falling back to local or in-memory MongoDB for development.");
      }
    }

    // Try local MongoDB next
    const localUri = "mongodb://localhost:27017/smart_learning";
    try {
      await mongoose.connect(localUri);
      console.log("MongoDB Connected (localhost)");
      return;
    } catch (localErr) {
      console.warn("Local MongoDB not available, will try in-memory MongoDB");
    }

    // Fall back to in-memory MongoDB for fast local dev (no Docker required)
    if (!MongoMemoryServer) {
      console.error(
        "mongodb-memory-server is not installed. Run 'npm install' in backend to enable in-memory MongoDB, or start a local/remote MongoDB and set MONGO_URI. Exiting."
      );
      process.exit(1);
    }

    const mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    await mongoose.connect(memUri);
    console.log("MongoDB Connected (in-memory)");
    // Keep mongod reference alive so it doesn't shut down while the app runs
    process._mongod = mongod;
  } catch (error) {
    console.error("Unexpected error connecting to MongoDB:", error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;