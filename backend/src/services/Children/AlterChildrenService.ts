import { getRepository } from 'typeorm';

import Children from '../../models/Children';

import AppError from '../../errors/AppError';

interface Request {
  id_int: number;
  name: string;
  currency: string;
  value: number;
  user_id: number;
}

class AlterChildrenService {
  async execute({ id_int, name, currency, value, user_id}: Request): Promise<void> {
    const usersRepository = getRepository(Children);

    const findChild = await usersRepository.find({
      where: {
        user_id: user_id,
        id: id_int
      }
    });

    if (findChild[0].id > 0) {

    } else {
      throw new AppError("Erro!", 400);
    }

    const updateChildBody = {
      name,
      currency,
      value
    }

    await usersRepository.update(id_int, updateChildBody);
  }
}

export default AlterChildrenService;