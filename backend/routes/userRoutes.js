import express from 'express';
import { AddNewUser, GetAdminDashboard, UserLogOut } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/admin/dashboard', GetAdminDashboard);

userRouter.post('/logout', UserLogOut);

userRouter.post('/admin/add-employee', AddNewUser);

export default userRouter;