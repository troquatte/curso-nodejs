import { authRouter } from 'modules/Auth/router';
import { userRouter } from './modules/User/router';
import { resetPasswordRouter } from 'modules/ResetPassword/router';
import { userClientRouter } from 'modules/UserClient/router';
import { userClientFilesRouter } from 'modules/UserClientFiles/router';

export const router = [
  authRouter,
  userRouter,
  resetPasswordRouter,
  userClientRouter,
  userClientFilesRouter,
];
