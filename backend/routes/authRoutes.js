import express from 'express';

import { CompanySignUP, CompanyVerification } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', CompanySignUP);

authRouter.post('/verify', CompanyVerification);

export default authRouter;