const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(201).json({
            _id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const login = async (req, res)=>{
    try {
            const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const userinfo = await User.findOne({ email: email });
        if(!userinfo){
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, userinfo.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({ id: userinfo._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(200).json({
            _id: userinfo._id,
            name: userinfo.name,
            email: userinfo.email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const getUser = async (req, res)=>{
    try {
        const isuser = await User.findById(req.user.id);
        if(!isuser){
            return res.status(400).json({message: "User not found"});
        }
        res.status(201).json({
            _id: isuser._id,
            name: isuser.name,
            email: isuser.email,
            token: req.token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};


module.exports = {
    register,
    login,
    getUser,
};