import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/your_database_name",
    );
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectMongo;
