import { Request, Response, NextFunction } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jwt-decode';

export const requireSignin = expressJwt({
  secret: (process.env.JWT_SECRET = 'JWT_SECRET'),
});

export const adminRessource = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  const data: any = token ? jwt(token) : null;
  if (data.role === 'king') {
    return next();
  } else {
    res.status(401).json({ message: 'Accès interdit' });
  }
};
