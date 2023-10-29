import { body } from 'express-validator';

export const createPostValidation = [
  body('caption').not().isEmpty().withMessage('Caption is required'),
];
