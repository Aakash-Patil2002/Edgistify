const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const path=require('path');
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
})

const authRoutes = require('./routes/authRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');




app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
