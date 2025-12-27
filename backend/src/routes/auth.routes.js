import express from 'express'
import { register } from '../controllers/auth.controller.js';

const authRoutes = express.Router();
authRoutes.post('/register', register)
// authRoutes.post('/login', login)
// authRoutes.post('/logout', logout)
// authRoutes.get('/me', getMe)
export default authRoutes;