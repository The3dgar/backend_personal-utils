import { Request, Response, NextFunction } from 'express';
import { validationResult, check, ValidationChain } from 'express-validator';

export const authValidationsTypes = {
  VALIDATE_SIGNUP: 'VALIDATE_SIGNUP',
};

export const checkErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const params = errors.array().map((error) => error.param).join(" or ");
  throw new Error("Invalid " + params);
};

const validateSignUp = () => [
  check('email').isEmail().withMessage('Email must be valid'),
  check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

export const authValidations = (path: string) => {
  let errorMiddleware: ValidationChain[] = [];
  switch (path) {
    case authValidationsTypes.VALIDATE_SIGNUP:
      errorMiddleware = validateSignUp();
      break;
  }

  errorMiddleware.push(checkErrors as ValidationChain);
  return errorMiddleware;
};
