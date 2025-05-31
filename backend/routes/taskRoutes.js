import express from 'express';
import { CreateNewTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/create-task', CreateNewTask);

export default taskRouter;