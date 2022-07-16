import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
  isMobile: boolean 
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password, isMobile }: Request): Promise<Response> {
    let token;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if ( !user ) {
      throw new AppError('E-mail ou Senha Incorreto!', 401);
    }

    //compara a senha
    const passwordMatched = await compare(password, user.password);

    if ( !passwordMatched ) {
      throw new AppError('E-mail ou Senha Incorreto!', 401);
    } 

    token = sign({ id: user.id, license_at: user.license_at }, authConfig.jwt.secret, { 
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;