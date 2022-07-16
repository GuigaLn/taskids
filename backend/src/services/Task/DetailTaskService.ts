import { getRepository } from 'typeorm';
import Child from '../../models/Children';

import AppError from '../../errors/AppError';

import Tasks from '../../models/Tasks';

interface Request {
  id_int: number;
  user_id: number;
}

class ListTaskServiceChild {
  async execute({ id_int, user_id }: Request): Promise< Error |Tasks[]> {
    const usersRepository = getRepository(Tasks);

    const findChild = await usersRepository.find({
      where: {
        id: id_int,
        realized: false,
      }
    });

    const idUser = Number(findChild[0].child.user_id);

    if (idUser != user_id) {
      throw new AppError("Erro!", 400);
    }

    return findChild;
  }
}

export default ListTaskServiceChild;