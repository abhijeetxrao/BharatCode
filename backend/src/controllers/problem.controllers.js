import {pollingBatch, problemId, submitBatch} from '../libs/judge0.lib.js'


export const createProblem=async(req,res)=>{
  const {title, description, difficulty, testCases, tags, examples, constraints, codeSnippets, referenceSolutions} = req.body;
  
  // if(req.user.role != "ADMIN")
  //   return res.status(403).json({message:"Access denied! Only admins can create problems."});

  try {
    
    for(const [language, code] of Object.entries(referenceSolutions)){
      const languageId = problemId(language);
      if(!languageId){
        return res.status(400).json({message:`Unsupported programming language: ${language}`});
      }

      const submission = testCases.map(({input, output})=>(
        {"language_id": languageId,
        "source_code": code,
        "stdin":input,
        "expected_output": output
        }
      ));
      console.log(`Submitting ${language} to Judge0...`);


      const submissionResult = await submitBatch(submission); // [{token},{token},{token}]

      const token = submissionResult.map(result => result.token);

      const result = await pollingBatch(token);

      for(let i =0; i<result.length; i++){
        if(result[i].status.id !==3){
          return res.status(400).json({message:`Reference solution failed for language: ${language} of testcase ${i+1}`,
            status:result[i].status
          });
        }
      }
    }
    const newProblem = await db.problem.create({
        title, description, difficulty, testCases, tags, examples, constraints, codeSnippets, referenceSolutions
      })
    return res.status(201).json(newProblem)




  } catch (error) {
    console.log(error);
    res.status(400).json({message:"Error is submitting problem",error})
  }
}



export const getAllProblem=async(req,res)=>{}

export const updateProblem=async(req,res)=>{}

export const getProblemById=async(req,res)=>{}

export const deleteProblem=async(req,res)=>{}

export const checkAllProblems=async(req,res)=>{}



