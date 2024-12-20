const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB Connection Successful');
});

db.on('error', (err) => {
    console.error('MongoDB Connection failed:', err);
});

module.exports = mongoose;