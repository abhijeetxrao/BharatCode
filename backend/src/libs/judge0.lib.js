import axios from 'axios'
export const submitBatch = async(submission)=>{
  const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/?base64_encoded=false&wait=false`, submission)
  return data;
}

const sleep =(ms)=>{
  return new Promise(resolve=>setTimeout(resolve,ms));
}

export const pollingBatch = async(token)=>{
  while(true){
    const tokens = token.join(",");
    const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
      params:{
        tokens:tokens.join(","),
        base64_encoded:false,
      }
    })

    const result = data.submissions;
    const isAllDone = result.every(r=>r.status.id!==1&&r.status.id!==2);
    if(isAllDone){
      return result;
    }
    sleep(1000);
  }
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




