import jwt from 'jsonwebtoken';
import {db} from '../libs/db.js';

export const authMiddleware = async(req,res,next)=>{
  try {
    const jwtkey = req.cookies.jwt
    if(!jwtkey){
      return res.json({
        message:"Cookies not present"
      })
    }
    const decoded = jwt.verify(jwtkey,process.env.JWT_SECRET);
    const user = await db.user.findUnique({
      where:{id:decoded.id},
      select:{
        id:true,
        name:true,
        email:true,
        image:true
    }})
    if(!user){
      return res.status(401).json({message:"User not found!"});
    }
    req.user = user;
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Error during authentication"});
  }
}