const express = require('express');
const authRouter = express.Router();
const {getUser,updateRole}=require("../controllers/Problem");
const userMiddleware = require("../midddleware/authMiddleware");
const adminmiddleware=require("../midddleware/adminMiddleware") // ✅ Fixed typo in folder name
const { register, login, logout,userDetails } = require('../controllers/authController');

// Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/user/detail',adminmiddleware,getUser);
authRouter.put('/user_make_admin/:userId',adminmiddleware,updateRole)
authRouter.post('/logout', userMiddleware, logout);
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})
authRouter.get('/user_details', userMiddleware, userDetails);
module.exports = authRouter;
