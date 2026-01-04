import {db} from '../libs/db.js'
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import {UserRole} from '@prisma/client'

export const register = async(req,res)=>{
  const {name, email, password} = req.body;

  // Validate inputs
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: "Name is required and must be a non-empty string" });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: "Email is required and must be a non-empty string" });
  }
  if (!password || typeof password !== 'string' || !password.trim()) {
    return res.status(400).json({ message: "Password is required and must be a non-empty string" });
  }

  try {



    const existingUser = await db.user.findUnique({
      where:{email}
    })

    if(existingUser){
      return res.status(400).json({message:"User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(typeof hashedPassword);

    const newUser = await db.user.create({
      data:{
        name,
        email,
        password:hashedPassword,
        role: UserRole.USER
      }
    })

    const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('jwt', token, {
      httpOnly:true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite:'strict',
      maxAge:7*24*60*60*1000 // 7 days
    })

    res.status(201).json({message:"User created successfully!",user:{name:newUser.name, email:newUser.email, role:newUser.role}});

  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message});
  }
}

export const login = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await db.user.findUnique({where:{email}})
    if(!user){
      return res.status(400).json({message:"User does not exists!"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message:"Username or password is wrong"});
    }

    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie('jwt', token, {
      httpOnly:true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite:'strict',
      maxAge:7*24*60*60*1000 // 7 days
    })

    return res.status(200).json({message:"User loggedIn successfully!",user:{name:user.name, email:user.email, role:user.role}});


    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message});
    
  }

}

export const logout = async (req,res)=>{
  try {
    res.clearCookie('jwt',{
      httpOnly:true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite:'strict',
    })
    res.status(200).json({message:"User logged out successfully!",success:true});
  } catch (error) {
    res.status(500).json(
      {message:error.message,success:false}
      )};
  }

  export const check = async(req,res)=>{
    console.log(req.user)
    try {
      
      res.status(200).json({
        message:"User authenticated successfully", 
        success:true,
        user:req.user
      })
    } catch (error) {
      res.status(500).json({
        message:"Error during checking authentication",
      })
    }
  }

  // export const me = async (req,res)=>{
  
// }

