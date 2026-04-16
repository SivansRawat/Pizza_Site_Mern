const express = require("express");
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require("./db.js");
const path = require('path');

if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET is not set. Use .env for local development and production secrets.");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');

// API routes
app.use('/api/pizzas', pizzasRoute)
app.use('/api/users/' , userRoute)
app.use('/api/orders/' , ordersRoute)


if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}






const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`))
