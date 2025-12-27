export const register = async(req,res)=>{
  const {name, email, password, image} = req.body;
  if(!name || !email ||!password){
    res.status(400).json({message:"All entries are required!"});
  }
}