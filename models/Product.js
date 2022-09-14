const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a valid name"],
  },
  price: {
    type: Number,
    required: [true, "please provide a valid price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["liddy", "caressa", "ikea", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
