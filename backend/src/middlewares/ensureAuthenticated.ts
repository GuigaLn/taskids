import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayLoad {
  id: number;
  license_at: Date;
  iat: number;
  exp: number;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  //Validacao do Token

  const authHeader = request.headers.authorization;

  if ( !authHeader ) {
    throw new AppError(' Token Invalido ', 401);
  }

  // bearer token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { id, license_at } = decoded as TokenPayLoad;

    //console.log(new Date(license_at));
    //console.log(new Date());

    if(new Date(license_at) <= new Date()) {
      throw new AppError('Expired License', 403);
    }

    request.user = id;

    return next();
  } catch (error: any) {
    if(error?.statusCode === 403) {
      throw new AppError(error?.message, error?.statusCode);
    }

    throw new AppError('Invalid JWT Token', 401);
  }
}