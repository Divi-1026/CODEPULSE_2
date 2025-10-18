const axios=require('axios');

const getLanguageById=(lang)=>{
    const language={
        "c++":54,
        "cpp":54,
        "java":62,
        "javascript":63,
        "c":50



    }
    return language[lang.toLowerCase()];

}
const submitBatch=async(submissions)=>{
    
const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false'
    },
    headers: {
      'x-rapidapi-key': 'dff0235960msh264869843463d89p164007jsn311893e795b0',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
    submissions
    }
  };
  
  async function fetchData() {
      try {
          const response = await axios.request(options);
          return response.data;
      } catch (error) {
          console.error(error);
      }
  }
  console.log("fetch called")
  const data = await fetchData();
  console.log("Get data")
//  console.log(data);
  return data;

} 
const waiting=async(timer)=>{
    setTimeout(()=>{
        return 1
    },timer);
}
const submitToken=async(resultToken)=>{
    

    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
      params: {
        tokens:resultToken.join(","),
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'x-rapidapi-key': 'dff0235960msh264869843463d89p164007jsn311893e795b0',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
      }
    };
    
    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    while(true){
    const res= await fetchData();
   const IsResultObtain= res.submissions.every((r)=>r.status_id>2);
   if(IsResultObtain) return res.submissions;
 
   await waiting(1000);
    }

}





module.exports={getLanguageById,submitBatch,submitToken};

