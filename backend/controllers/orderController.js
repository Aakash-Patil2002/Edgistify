const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.PlaceOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, address, products, totalPrice } = req.body;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Product "${product.name}" is out of stock or has insufficient quantity. Available stock: ${product.stock}`,
        });
      }
    }

    const order = new Order({
      userId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      products,
      totalPrice,
      shippingAddress: address,
    });

    await order.save();

    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.MyOrders=async(req,res)=>{
  try {
    const userId = req.userId;
    const myOrders=await Order.find({userId});
    res.status(200).json({myOrders});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
