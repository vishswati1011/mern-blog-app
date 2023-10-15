const mongoose = require("mongoose");

const connectDb = async () => {
  const MONGODB =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URL
      : process.env.MONGO_ALTAS_URL;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB:", mongoose.connection.name);
  } catch (e) {
    console.log("Connected to MongoDB:", mongoose.connection.name);
    throw new Error(e);
  }
};

module.exports = connectDb;
