import { response } from 'express';
import { getRepository } from 'typeorm';
import Children from '../../models/Children';

import Tasks from '../../models/Tasks';

interface Request {
  id_int: number;
}

class ValidateTaskService {
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
      console.log("Ja Relizado");
      return;
    }

    await tasksRepository.update(id_int, updateTaskBody);

    const childRepository = getRepository(Children);

    const findChild = await childRepository.findOne({
      where: {
        id: findTask?.child_id
      }
    });

    const valueTotal = Number(findTask?.amount) + Number(findChild?.value);

    const updateChildBody = {
      value: valueTotal
    }

    const idChild = Number(findTask?.child_id);

    await childRepository.update(idChild, updateChildBody);
  }
}

export default ValidateTaskService;