import { body } from 'express-validator';

export const createUserValidation = [
  body('nama').not().isEmpty().withMessage('Nama is required'),
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password')
    .isLength({
      min: 6,
    })
    .withMessage('Password is required with minimum lenght is 6'),
];

// export const updateUserValidator = [

// ]
