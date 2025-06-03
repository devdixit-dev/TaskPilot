import express from 'express';
import { AddNewUser, ChangePassword, GetAdminDashboard, UserLogOut } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/admin/dashboard', GetAdminDashboard);

userRouter.post('/logout', UserLogOut);

userRouter.post('/admin/add-employee', AddNewUser);

userRouter.post('/change-password', ChangePassword);

export default userRouter;