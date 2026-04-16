const mongoose = require("mongoose");
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pizza_site_mern";

mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).catch((err) => {
    console.error('MongoDB initial connection failed:', err.message);
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB Connection Successful');
});

db.on('error', (err) => {
    console.error('MongoDB Connection failed:', err);
});

module.exports = mongoose;
