import { response } from 'express';
import { getRepository } from 'typeorm';
import Children from '../../models/Children';

import Tasks from '../../models/Tasks';

interface Request {
  id_int: number;
}

class InvalidateTaskService {
  async execute({ id_int }: Request): Promise<void> {
    const updateTaskBody = {
      realized: true
    }

    const tasksRepository = getRepository(Tasks);

    const findTask = await tasksRepository.findOne({
      where: {
        id: id_int
      }
    });

    if (findTask?.realized) { 
      return;
    }

    await tasksRepository.update(id_int, updateTaskBody);

  }
}

export default InvalidateTaskService;