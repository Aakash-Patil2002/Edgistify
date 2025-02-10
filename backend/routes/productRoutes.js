const express=require("express");
const { AllProducts } = require("../controllers/productController");
const router=express.Router();

router.get('/',AllProducts);

module.exports=router;