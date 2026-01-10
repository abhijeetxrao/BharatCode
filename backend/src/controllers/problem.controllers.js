import problemRoute from "../routes/problem.route"

export const createProblem=async(req,res)=>{
  const {title, description, difficulty, testCases, tags, examples, constraints, codeSnippets, referenceSolutions} = req.body;
  
  if(req.user.role != "ADMIN")
    return res.status(403).json({message:"Access denied! Only admins can create problems."});

  try {         

  } catch (error) {

  }
}



export const getAllProblem=async(req,res)=>{}

export const updateProblem=async(req,res)=>{}

export const getProblemById=async(req,res)=>{}

export const deleteProblem=async(req,res)=>{}

export const checkAllProblems=async(req,res)=>{}



