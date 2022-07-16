import { getRepository, IsNull } from 'typeorm';

import Children from '../../models/Children';

import AppError from '../../errors/AppError';

interface Request {
  id_int: number;
  user_id: number;
}

class DetailChildrenService {
  async execute({ id_int, user_id }: Request): Promise<Children[]> {
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

    return findChild;
  }
}

export default DetailChildrenService;