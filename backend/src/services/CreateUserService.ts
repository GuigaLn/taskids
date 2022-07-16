import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  phone: string;
}

class CreateUserService {
  async execute({ name, email, password, phone}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if(checkUserExist) {
      throw new AppError('Email ja cadastrado!', 401);
    }

    const hashedPassowrd = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassowrd,
      phone
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;