const { validationResult } = require('express-validator');
import { Request, Response, NextFunction } from 'express';

type Params = {
  msg: string;
  param: any;
};
exports.runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorFormatter = ({ msg, param }: Params) => {
    return {
      propertyPath: param,
      message: msg,
    };
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(422).json({
      violations: result.array(),
    });
  }
  next();
};
