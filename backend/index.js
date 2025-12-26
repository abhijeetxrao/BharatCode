import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.get('/',()=>{
  console.log("Listening");
})
app.listen(process.env.PORT,()=>{
  console.log("Server is running on port", process.env.PORT);
})