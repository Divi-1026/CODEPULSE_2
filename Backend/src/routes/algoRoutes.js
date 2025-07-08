const express = require('express');
const router = express.Router();
const { handleMergeSort } = require('../controllers/algoController');

// Route for merge sort
router.post('/mergesort', handleMergeSort);

module.exports = router; // ✅ THIS IS IMPORTANT!
