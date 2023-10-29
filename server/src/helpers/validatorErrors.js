import { validationResult } from 'express-validator';
import fs from 'fs';

export const validatorErrors = (req, res, next) => {
  try {
    validationResult(req).throw();

    next();
  } catch (errors) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).send(errors);
  }
};
