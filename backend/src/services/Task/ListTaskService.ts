import { getRepository } from 'typeorm';
import Child from '../../models/Children';

import Tasks from '../../models/Tasks';

interface Request {
  user_id: number;
}

class ListTaskService {
  async execute({ user_id }: Request): Promise<Tasks[]> {
    const usersRepository = getRepository(Tasks);

    const findChild = await usersRepository.find({
      where: {
        realized: false,
      }
    });

    const filtred = findChild.filter(child => (
      child.child.user_id == user_id
    ));

    return filtred;
  }
}

export default ListTaskService;