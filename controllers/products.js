const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getAllProductsStatic = asyncHandler(async (req, res, next) => {
  const products = await Product.find({
    featured: true,
  }).select("-name");
  res
    .status(200)
    .json({ success: true, products, totalProducts: products.length });
});
const getAllProducts = asyncHandler(async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const query = {};
  if (featured) {
    query.featured = featured === "true" ? true : false;
  }
  if (company) {
    query.company = company;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(query);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const products = await result;
  res
    .status(200)
    .json({ success: true, products, totalProducts: products.length });
});

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
