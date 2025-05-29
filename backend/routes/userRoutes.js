import express from 'express';
import { GetAdminDashboard, UserLogOut } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/admin/dashboard', GetAdminDashboard);

userRouter.post('/logout', UserLogOut);

export default userRouter;