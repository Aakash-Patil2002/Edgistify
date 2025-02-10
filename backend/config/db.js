const mongoose = require('mongoose');
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then((result) => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error('Database connection failed:', err.message);
    });;
};
module.exports = connectDB;
