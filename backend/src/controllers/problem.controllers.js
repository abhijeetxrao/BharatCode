import {pollingBatch, problemId, submitBatch} from '../libs/judge0.lib.js'
import problemRoute from "../routes/problem.route"


export const createProblem=async(req,res)=>{
  const {title, description, difficulty, testCases, tags, examples, constraints, codeSnippets, referenceSolutions} = req.body;
  
  if(req.user.role != "ADMIN")
    return res.status(403).json({message:"Access denied! Only admins can create problems."});

  try {
    
    for(const [language, codeSnippets] of Object.entries(referenceSolutions)){
      const languageId = problemId(language);
      if(!languageId){
        return res.status(400).json({message:`Unsupported programming language: ${language}`});
      }

      const  submission = testCases.map(({input, output})=>(
        {"language_id": languageId,
        "source_code": codeSnippets,
        "stdin":input,
        "expected_output": output
        }
      ))

      const submissionResult = await submitBatch(submission); // [{token},{token},{token}]
      const token = submissionResult.map(result => result.token);

      const result = await pollingBatch(token);

      for(let i =0; i<result.length; i++){
        if(result[i].status.id !==3){
          return res.status(400).json({message:`Reference solution failed for language: ${language} of testcase $(i+1)`});
        }
      }

      const newProblem = await db.problem.create({
        title, description, difficulty, testCases, tags, examples, constraints, codeSnippets, referenceSolutions
      })
      return res.json({newProblem})
    }
    




  } catch (error) {

  }
}



export const getAllProblem=async(req,res)=>{}

export const updateProblem=async(req,res)=>{}

export const getProblemById=async(req,res)=>{}

export const deleteProblem=async(req,res)=>{}

export const checkAllProblems=async(req,res)=>{}



