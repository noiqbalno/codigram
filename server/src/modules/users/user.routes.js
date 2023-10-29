import { Router } from 'express';
import {
  createUser,
  getAllUser,
  getByIdUser,
  login,
  updateUser,
} from './user.controllers.js';
import { uploadUser } from '../../middlewares/uploadMulter.js';
import { createUserValidation } from './user.validation.js';
import { validatorErrors } from '../../helpers/validatorErrors.js';
import { authCheck } from '../../middlewares/auth.js';

const userRouter = Router();

userRouter.get('/users', authCheck, getAllUser);
userRouter.post(
  '/users/register',
  uploadUser.single('image'),
  createUserValidation,
  validatorErrors,
  createUser
);
userRouter.put(
  '/users/update/:id',
  uploadUser.single('image'),
  createUserValidation,
  validatorErrors,
  updateUser
);
userRouter.post('/users/login', login);
userRouter.get('/users/:id', getByIdUser);

export default userRouter;
