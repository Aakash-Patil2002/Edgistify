const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName:{
      type:String,
      required:true
    },
    customerEmail:{
      type:String,
      required:true
    },
    customerPhone:{
      type:String,
      required:true
    },
    shippingAddress: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productImage:{type:String,required:true},
        productName:{type:String,required:true},
        quantity: { type: Number, required: true },
        productPrice: { type: Number, required: true },
      },
    ],
    totalPrice: { type: String, required: true }, 
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
