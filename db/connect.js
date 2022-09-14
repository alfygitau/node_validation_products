const mongoose = require("mongoose");

const configureDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = configureDB;
