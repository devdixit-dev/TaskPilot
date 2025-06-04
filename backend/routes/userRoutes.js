import express from 'express';
import { AddNewUser, ChangePassword, DeactivateUser, GetAdminDashboard, RemoveUser, UserLogOut } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/admin/dashboard', GetAdminDashboard);

userRouter.post('/logout', UserLogOut);

userRouter.post('/admin/add-employee', AddNewUser);

userRouter.post('/admin/deactivate-account/:id', DeactivateUser);

userRouter.post('/admin/remove-user/:id', RemoveUser);

userRouter.post('/change-password', ChangePassword);

export default userRouter;