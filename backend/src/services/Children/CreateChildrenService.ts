import { getRepository } from 'typeorm';

import Children from '../../models/Children';

interface Request {
  name: string;
  currency: string;
  user_id: number;
}

class CreateChildrenService {
  async execute({ name, currency, user_id}: Request): Promise<Children> {
    const usersRepository = getRepository(Children);

    const child = usersRepository.create({
      name,
      currency,
      user_id
    });

    await usersRepository.save(child);

    return child;
  }
}

export default CreateChildrenService;