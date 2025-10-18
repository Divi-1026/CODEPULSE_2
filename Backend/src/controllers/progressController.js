// controllers/progressController.js
const Progress = require('../models/Progress');

// Get all marked problems for user
const getMarkedProblems = async (req, res) => {
  try {
    // console.log("Function called")
    const userId = req.result;
    // console.log(userId)
    if (!userId) {
      return res.status(400).json({ success: false, message: "User not authenticated" });
    }

    const markedProgress = await Progress.findOne({ user: userId });
    // console.log(markedProgress.markedProblems)
    return res.status(200).json({
      success: true,
      markedProblems: markedProgress?.markedProblems || [],
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
    console.log(req.result)
  // console.log(req.params)
  // console.log(problemTitle)
    let progress = await Progress.findOne({ user: req.result});

    if (!progress) {
      progress = new Progress({
        user: req.result,
        markedProblems: [problemTitle]
      });
    } else {
      const index = progress.markedProblems.indexOf(problemTitle);
      if (index === -1) {
        progress.markedProblems.push(problemTitle);
      } else {
        progress.markedProblems.splice(index, 1);
      }
    }
    console.log(progress.markedProblems)
// console.log("suces")
    await progress.save();
    res.json({ success: true, markedProblems: progress.markedProblems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports={getMarkedProblems,toggleProblemStatus}