const express = require('express');
const {  getMarkedProblems, toggleProblemStatus 
} = require('../controllers/progressController');
const authMiddleware = require('../midddleware/authMiddleware'); // Fixed path

const router = express.Router();

// Mark/unmark a problem

// routes.js
router.post('/toggle-title/:problemTitle', authMiddleware, toggleProblemStatus );

// Get user's marked problems
router.get('/marked', authMiddleware, getMarkedProblems);

module.exports = router;