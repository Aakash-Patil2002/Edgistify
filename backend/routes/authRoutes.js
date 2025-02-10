const express = require('express');
const router = express.Router();
const {Register , Login}=require('../controllers/authController');

router.post('/login',Login);
router.post('/register',Register);

module.exports=router;