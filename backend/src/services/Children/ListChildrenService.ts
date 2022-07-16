import { getRepository } from 'typeorm';

import Children from '../../models/Children';

interface Request {
  user_id: number;
}

class ListChildrenService {
  async execute({ user_id }: Request): Promise<Children[]> {
    const usersRepository = getRepository(Children);

    const findChild = await usersRepository.find({
      where: {
        user_id: user_id
      }
    });

    return findChild;
  }
}

export default ListChildrenService;