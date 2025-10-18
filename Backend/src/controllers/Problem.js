const {getLanguageById,submitBatch,submitToken} = require("../utils/ProblemUtility");
const Problem = require("../models/problem");
const User = require("../models/User");
const Submission = require("../models/submisssion");
const { get } = require("mongoose");
// const SolutionVideo = require("../models/solutionVideo")

const createProblem = async (req,res)=>{
   console.log("Problem create")
  // API request to authenticate user:
    const {title,description,difficulty,tags,
        visibletestcases,hiddentestacases,startcode,
        referenceSolution, problemcreator
    } = req.body;


    try{
       
      for(const {language,completecode} of referenceSolution){
         

        // source_code:
        // language_id:
        // stdin: 
        // expectedOutput:

        const languageId = getLanguageById(language);
          
        // I am creating Batch submission
        const submissions = visibletestcases.map((testcase)=>({
            source_code:completecode,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));


        const submitResult = await submitBatch(submissions);
        // console.log(submitResult);

        const resultToken = submitResult.map((value)=> value.token);

        // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
        
       const testResult = await submitToken(resultToken);


       console.log(testResult);

       for(const test of testResult){
        if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

      }


      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemcreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}
const updateRole = async (req, res) => {
  try {
    const { userId } = req.params;      // get userId from URL params

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update role to admin
    user.role = "admin";

    // Save changes
    await user.save();

    res.status(200).json({ message: "User promoted to admin successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateProblem = async (req,res)=>{
    
  const {id} = req.params;
  
  const {title,description,difficulty,tags,
    visibletestcases,hiddentestacases,startcode,
    referenceSolution,problemcreator
   } = req.body;
// console.log("upate called",title,problemcreator)
  try{

     if(!id){
      return res.status(400).send("Missing ID Field");
     }

    const DsaProblem =  await Problem.findById(id);
    if(!DsaProblem)
    {
      return res.status(404).send("ID is not persent in server");
    }
      
    for(const {language,completecode} of referenceSolution){
         

      // source_code:
      // language_id:
      // stdin: 
      // expectedOutput:

      const languageId = getLanguageById(language);
        // console.log(languageId);
      // I am creating Batch submission
      const submissions = visibletestcases.map((testcase)=>({
          source_code:completecode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output
      }));


      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value)=> value.token);

      // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
      
     const testResult = await submitToken(resultToken);

    //  console.log(testResult);
// console.log(testResult);
     for(const test of testResult){
      if(test.status_id!=3){
       return res.status(400).send("Error Occured");
      }
     }

    }


  const newProblem = await Problem.findByIdAndUpdate(id , {...req.body}, {runValidators:true, new:true});
   
  res.status(200).send(newProblem);
  }
  catch(err){
      res.status(500).send("Error: "+err);
  }
}

const deleteProblem = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

   const deletedProblem = await Problem.findByIdAndDelete(id);

   if(!deletedProblem)
    return res.status(404).send("Problem is Missing");


   res.status(200).send("Successfully Deleted");
  }
  catch(err){
     
    res.status(500).send("Error: "+err);
  }
}


const getProblemById = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (!id)
      return res.status(400).send("ID is Missing");

    console.log("Back - Fetching problem with ID:", id);

    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibletestcases hiddentestcases startcode referenceSolution problemcreator');
    
    console.log("Find Problem:", getProblem);
    
    if (!getProblem)
      return res.status(404).send("Problem is Missing");

    // Ensure all fields have proper default values
    const problemData = {
      _id: getProblem._id,
      title: getProblem.title || 'Untitled Problem',
      description: getProblem.description || 'No description available',
      difficulty: getProblem.difficulty || 'medium',
      tags: getProblem.tags || 'General',
      visibletestcases: getProblem.visibletestcases || [],
      hiddentestcases: getProblem.hiddentestacases || [],
      startcode: getProblem.startcode || [],
      referenceSolution: getProblem.referenceSolution || [],
      problemcreator: getProblem.problemcreator
    };

    console.log("Sending problem data:", problemData);
    res.status(200).json(problemData);

  } catch (err) {
    console.error("Error fetching problem:", err);
    res.status(500).send("Error: " + err.message);
  }
}

const getAllProblem = async(req,res)=>{

  try{
     console.log("Get probem Called")
    const getProblem = await Problem.find({}).select('_id title difficulty description tags');

   if(getProblem.length==0)
    return res.status(404).send("Problem is Missing");
 console.log("getAllProblem",getProblem)

   res.status(200).send(getProblem);
  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
}
const getUser = async (req, res) => {
  try {
    const users = await User.find({});  // fetch all fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};



const solvedAllProblembyUser =  async(req,res)=>{
   
    try{
       
      const userId = req.result._id;

      const user =  await User.findById(userId).populate({
        path:"problemSolved",
        select:"_id title difficulty tags problemId createdAt"
      });
      console.log("hello");
      console.log(user.problemSolved.createdAt)
      res.status(200).send(user.problemSolved);

    }
    catch(err){
      res.status(500).send("Server Error");
    }
}

const submittedProblem = async(req,res)=>{

  try{
     
    const userId = req.result._id;
    const problemId = req.params.pid;

   const ans = await Submission.find({userId,problemId});
  
  if(ans.length==0)
    res.status(200).send("No Submission is persent");

  res.status(200).send(ans);

  }
  catch(err){
     res.status(500).send("Internal Server Error");
  }
}



module.exports = {updateRole,createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem,getUser};


