const express = require('express');
const authRouter = express.Router();

const userMiddleware = require("../midddleware/authMiddleware"); // ✅ Fixed typo in folder name
const { register, login, logout,userDetails } = require('../controllers/authController');

// Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.get('/user_details', userMiddleware, userDetails);
module.exports = authRouter;
