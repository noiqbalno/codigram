import { Router } from 'express';
import userRouter from '../modules/users/user.routes.js';
import postRouter from '../modules/posts/post.routes.js';

const router = Router();

router.use(userRouter);
router.use(postRouter);

export default router;
