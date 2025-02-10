const Cart = require("../models/cart");
const mongoose = require("mongoose");

exports.AddToCart = async (req, res) => {
  const userId = req.userId;
  const { prodId } = req.body;

  try {
    const prodExist = await Cart.findOne({
      userId: userId,
      "products.productId": prodId,
    });
  
    if (prodExist) {
      return res.status(400).json({ message: "Product already exist in cart" });
    }
  
    const addedToCart = await Cart.updateOne(
      { userId },
      { $push: { products: { productId: prodId, quantity: 1 } } }
    );
    if (addedToCart) {
      res.status(200).json({ message: "Product added to cart" });
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.MyCartProducts = async (req, res) => {
  const userId = req.userId;
 try {
   const myCart = await Cart.aggregate([
     {
       $match: {
         userId: new mongoose.Types.ObjectId(userId),
       },
     },
     {
       $unwind: "$products",
     },
     {
       $lookup: {
         from: "products",
         localField: "products.productId",
         foreignField: "_id",
         as: "productDetails",
       },
     },
     {
       $unwind: "$productDetails",
     },
     {
       $project: {
         _id: 0,
         productId: "$products.productId",
         quantity: "$products.quantity",
         productName: "$productDetails.name",
         productPrice: "$productDetails.price",
         productImage: "$productDetails.imageUrl",
       },
     },
   ]);
 
   res.status(200).json({ myCartProducts: myCart });
  
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

exports.ProdQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { qty, prodId } = req.body;
    const result = await Cart.updateOne(
      { userId: userId, "products.productId": prodId },
      { $set: { "products.$.quantity": qty } }
    );

    res.status(200).json({ message: "Quantity change" });
  } catch (error) {
    console.log("Internal Server error");
  }
};

exports.RemoveFromCart = async (req, res) => {
  const userId = req.userId;
  const { prodId } = req.params;
  try {
    const result = await Cart.updateOne(
      { userId: userId },
      { $pull: { products: { productId: prodId } } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({message:"Product removed successfully"});
    }
  } catch (error) {
    console.error("Error removing product:", error);
  }
};
