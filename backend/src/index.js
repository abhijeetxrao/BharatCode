import dotenv from 'dotenv/config';
import express from 'express';  

import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());

import authRoutes from './routes/auth.routes.js'

app.use('/api/v1/auth',authRoutes);
app.get('/',(req,res)=>{
  res.send("Listeing...");
})
app.listen(process.env.PORT,()=>{
  console.log("Server is running on port", process.env.PORT);
})