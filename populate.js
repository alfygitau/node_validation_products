require("dotenv").config();
const configureDB = require("./db/connect");
const Product = require("./models/Product");
const products = require("./products.json")

const start = async () => {
  try {
    await configureDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);
    console.log("Successful....")
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//
start();
