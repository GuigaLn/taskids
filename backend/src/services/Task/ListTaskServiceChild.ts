import { getRepository } from 'typeorm';
import Child from '../../models/Children';

import Tasks from '../../models/Tasks';

interface Request {
  child_id: number;
}

class ListTaskServiceChild {
  async execute({ child_id }: Request): Promise<Tasks[]> {
    const usersRepository = getRepository(Tasks);

    const findChild = await usersRepository.find({
      where: {
        child_id: child_id,
        realized: false,
      }
    });
    
    return findChild;
  }
}

export default ListTaskServiceChild;