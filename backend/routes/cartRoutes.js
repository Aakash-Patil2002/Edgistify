const { AddToCart, MyCartProducts, ProdQuantity, RemoveFromCart } = require("../controllers/cartController");
const express=require("express");
const auth = require("../middleware/auth");
const router= express.Router();

router.post('/addtocart', auth,AddToCart)
router.get('/getcart', auth,MyCartProducts);
router.put('/quantity',auth, ProdQuantity);
router.delete('/removetocart/:prodId?',auth,RemoveFromCart);
module.exports=router;