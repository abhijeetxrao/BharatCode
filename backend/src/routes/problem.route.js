import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { checkAdmin } from '../middlewares/check.middleware.js';
import { createProblem, getAllProblem, updateProblem, getProblemById, deleteProblem, checkAllProblems } from '../controllers/problem.controllers.js';

const problemRoute = express.Router();

problemRoute.post('/create-problem',authMiddleware, createProblem);
problemRoute.get('all-problem',authMiddleware,getAllProblem);
problemRoute.put('update-problem/:id', authMiddleware, checkAdmin,updateProblem);
problemRoute.get('problem/:id', authMiddleware, getProblemById);
problemRoute.delete('delete-problem/:id', authMiddleware, checkAdmin, deleteProblem);
problemRoute.get('solved-problems', authMiddleware,checkAllProblems);

export default problemRoute

