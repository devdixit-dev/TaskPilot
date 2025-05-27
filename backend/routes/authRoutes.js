import express from 'express';

import { CompanySignUP } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', CompanySignUP);

export default authRouter;