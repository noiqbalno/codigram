import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
} from './post.controllers.js';
import { uploadPost } from '../../middlewares/uploadMulter.js';
import { createPostValidation } from './post.validation.js';
import { validatorErrors } from '../../helpers/validatorErrors.js';
import { authCheck } from '../../middlewares/auth.js';

const postRouter = Router();

postRouter.get('/posts', getAllPosts);
postRouter.get('/posts/user/:userId', getPostsByUser);
postRouter.get('/posts/detail/:id', getPostById);
postRouter.post(
  '/posts/create',
  authCheck,
  uploadPost.single('image'),
  createPostValidation,
  validatorErrors,
  createPost
);
postRouter.put(
  '/posts/update/:id',
  authCheck,
  uploadPost.single('image'),
  createPostValidation,
  validatorErrors,
  updatePost
);
postRouter.delete('/posts/delete/:id', authCheck, deletePost);

export default postRouter;
