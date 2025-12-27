import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
import authRoutes from './routes/auth.routes.js'

app.use('/api/v1/auth',authRoutes);
app.get('/',()=>{
  console.log("Listening");
})
app.listen(process.env.PORT,()=>{
  console.log("Server is running on port", process.env.PORT);
})