import { getRepository } from 'typeorm';

import Tasks from '../../models/Tasks';
import ListChildrenService from '../Children/ListChildrenService';

interface Request {
  title: string;
  description: string;
  amount: number;
  answer: boolean;
  child_id: number;
  user_id: number;
}

class CreateTaskService {
  async execute({ title, description, amount, answer, child_id, user_id }: Request): Promise<boolean> {
    const usersRepository = getRepository(Tasks);

    if(child_id == 0) {  
      const listChildren = new ListChildrenService();
      const children = await listChildren.execute({ user_id });

      await Promise.all(children.map(async (child) => {
        let task = usersRepository.create({
          title,
          description,
          amount,
          answer,
          child_id: child.id
        });
        await usersRepository.save(task);
      }));
      return true;
    } else {
      console.log(child_id)
      const task = usersRepository.create({
        title,
        description,
        amount,
        answer,
        child_id,
      });
      await usersRepository.save(task);
      return true;
    }
  }
}

export default CreateTaskService;