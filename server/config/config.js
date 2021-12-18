const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to Mongodb ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`DB Errror ${error}`);
  }
};

module.exports = connectDb;
