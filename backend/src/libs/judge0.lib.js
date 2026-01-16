import axios from 'axios'
export const submitBatch = async(submissions)=>{
  const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {submissions})
  
  return data;
}

const sleep =(ms)=>{
  new Promise(resolve=>setTimeout(resolve,ms));
}

export const pollingBatch = async(token)=>{
  const maxAttempts = 30;
  let attempts =0;
  while(attempts<maxAttempts){
    const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
      params:{
        tokens:token.join(","),
        base64_encoded:false,
      }
    })

    const result = data.submissions;
    const isAllDone = result.every(r=>r.status.id!==1&&r.status.id!==2);
    if(isAllDone){
      return result;
    }
    await sleep(1500);
    attempts++;
  }
  throw new Error("Judge0 polling timed out.");
}



export const problemId =(language)=>{
  const languageMap = {
    'C': 50,
    'CPP': 54,
    'JAVA': 62,
    'JAVASCRIPT': 63,
  }
  return languageMap[language.toUpperCase()];
}




