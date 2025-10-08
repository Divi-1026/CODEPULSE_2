// controllers/progressController.js
const Theory = require('../models/Theory');

// Get all marked problems for user
const getMarkedProblems = async (req, res) => {
  try {
    console.log("Function called");
    console.log("I am called gettheroy")
    const userId = req.user._id; // Changed from req.result to req.user._id
    console.log(userId);
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User not authenticated" });
    }

    const theoryDoc = await Theory.findOne({ user: userId });
    console.log("Found theory document:", theoryDoc);
    
    return res.status(200).json({
      success: true,
      markedProblems: theoryDoc?.markedProblems || [],
    });
  } catch (error) {
    console.error("Error in getMarkedProblems:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Toggle problem status
const toggleProblemStatus = async (req, res) => {
  try {
    const { problemTitle } = req.params;
    console.log("Toggle request for:", problemTitle);
    console.log("User ID:", req.user._id);

    let theoryDoc = await Theory.findOne({ user: req.user._id });

    if (!theoryDoc) {
      // Create new document if doesn't exist
      theoryDoc = new Theory({
        user: req.user._id,
        markedProblems: [problemTitle]
      });
      console.log("Created new theory document");
    } else {
      // Toggle the problem in markedProblems array
      const index = theoryDoc.markedProblems.indexOf(problemTitle);
      if (index === -1) {
        // Add if not present
        theoryDoc.markedProblems.push(problemTitle);
        console.log("Added problem to markedProblems");
      } else {
        // Remove if present
        theoryDoc.markedProblems.splice(index, 1);
        console.log("Removed problem from markedProblems");
      }
    }

    // Save the document
    await theoryDoc.save();
    console.log("Saved theory document:", theoryDoc.markedProblems);
    
    res.json({ 
      success: true, 
      marked: theoryDoc.markedProblems.includes(problemTitle),
      markedProblems: theoryDoc.markedProblems 
    });
  } catch (error) {
    console.error("Error in toggleProblemStatus:", error.message);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

module.exports = { getMarkedProblems, toggleProblemStatus };