const express = require('express');
const { PlaceOrder, MyOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/',auth,PlaceOrder)
router.get('/',auth,MyOrders)

module.exports = router;
