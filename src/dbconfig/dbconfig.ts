import mongoose from "mongoose";

export async function connect() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("❌ MONGO_URI environment variable is not defined");
    }

    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(mongoUri);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
    console.error(error);
    process.exit(1);
  }
}
