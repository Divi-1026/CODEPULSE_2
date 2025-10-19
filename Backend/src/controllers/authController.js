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
  try{
          // validate the data;
  
        validate(req.body); 
        const {firstName, emailId, password}  = req.body;
  
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user'
      //
      
       const user =  await User.create(req.body);
       const token =  jwt.sign({_id:user._id , emailId:emailId, role:'user'},process.env.JWT_SECRET,{expiresIn: 60*60});
       const reply = {
          firstName: user.firstName,
          emailId: user.emailId,
          _id: user._id,
          role:user.role,
      }
      
       res.cookie('token', token, {
  httpOnly: true,
  secure: true,       // must be true on HTTPS (production)
  sameSite: 'None',   // allow cross-site cookie
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

       res.status(201).json({
          user:reply,
          message:"Loggin Successfully"
      })
      }
      catch(err){
          res.status(400).send("Error: hee "+err);
      }
};

// Login function
const login = async (req, res) => {
  try{
          const {emailId, password} = req.body;
  console.log("Backend");
  console.log(emailId,password);
          if(!emailId)
              throw new Error("Invalid Credentials");
          if(!password)
              throw new Error("Invalid Credentials");
  
          const user = await User.findOne({emailId});
  console.log(user);
          const match = await bcrypt.compare(password,user.password);
  console.log(match)
          if(!match)
              throw new Error("Invalid Credentials");
  
          const reply = {
              firstName: user.firstName,
              emailId: user.emailId,
              _id: user._id,
              role:user.role,
          }
  
          const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_SECRET,{expiresIn: 60*60});
          res.cookie('token', token, {
  httpOnly: true,
  secure: true,       // must be true on HTTPS (production)
  sameSite: 'None',   // allow cross-site cookie
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

          res.status(201).json({
              user:reply,
              message:"Loggin Successfully"
          })
      }
      catch(err){
          res.status(401).send("Error gg: "+err);
      }
};
const logout=async(req,res)=>{
  try{
    //validate the token
    const {token}=req.cookies;
    console.log(token);
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
