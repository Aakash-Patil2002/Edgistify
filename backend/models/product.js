const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true},
  imageUrl: {type:String, required:true},
  brand: { type: String, required:true},
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
