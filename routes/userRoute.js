const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const { protect, admin } = require("../middleware/authMiddleware");

const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

const createToken = (userId) => {
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "30d" });
};

router.post("/register", async(req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {

        const user = await User.findOne({email})

        const isBcryptPassword = user && user.password && user.password.startsWith("$2");
        const passwordMatches = user && (
            isBcryptPassword
                ? await bcrypt.compare(password, user.password)
                : user.password === password
        );

        if(user && passwordMatches)
        {
            if (!isBcryptPassword) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
            }

            res.send({
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id,
                token: createToken(user._id)
            });
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went wrong' });
    }
  
});


router.get("/getallusers", protect, admin, async(req, res) => {

    try {
        const users = await User.find({}).select("-password")
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", protect, admin, async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});



module.exports = router
