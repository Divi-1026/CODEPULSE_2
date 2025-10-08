const redisClient = require("../config/redis");

const User = require("../models/User");
const validate = require('../utils/validators');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: __dirname + '/../../.env' });
const jwt = require('jsonwebtoken');

// Register function
const userDetails=async(req,res)=>{
try {
    const user = req.result;
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await User.findById(user);
    console.log(result)
    if (!result) return res.status(404).json({ message: "User not found" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const register = async (req, res) => {
  try {
    validate(req.body);

    const { name,password, email } = req.body;

    // Hash password
    req.body.password = await bcrypt.hash(password, 10);
    
    // Create user in DB
    const u1 = await User.create(req.body);

    // Create token using u1._id (not model name)
    const token = jwt.sign({ _id: u1._id, email:email }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    req.result=u1._id;
    const reply={
      name:u1.name,
      email:u1.email,
      _id:u1._id
    }
    req.result=u1._id;
    console.log(reply);
    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({

      user:reply,
      message:"Registered Successfully"
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentials");
    req.result=user._id;
const reply={
  name:user.name,
  email:user.email,
  _id:user._id
}
    const token = jwt.sign({ _id: user._id, email:email}, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({

      user:reply,
      message:"Loggin Successfully"
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};
const logout=async(req,res)=>{
  try{
    //validate the token
    const {token}=req.cookies;
    const  payload=jwt.decode(token);
    await redisClient.set(`token:${token}`,"Block");
    await redisClient.expireAt(`token:${token}`,payload.exp);
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("Logged Out Successfully");
    // token add in redis to block
    //cookies ko clear kar dena
  }
  catch{
res.status(401).send("Invalid")
  }
}

module.exports = { register, login ,logout ,userDetails};
