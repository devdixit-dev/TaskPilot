import express from 'express';

import { CompanySignUP, CompanyVerification, Login } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', CompanySignUP);

authRouter.post('/verify', CompanyVerification);

authRouter.post('/login', Login);

export default authRouter;