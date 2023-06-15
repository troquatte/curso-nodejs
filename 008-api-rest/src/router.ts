import { authRouter } from 'modules/Auth/router';
import { userRouter } from './modules/User/router';
import { resetPasswordRouter } from 'modules/ResetPassword/router';

export const router = [authRouter, userRouter, resetPasswordRouter];
