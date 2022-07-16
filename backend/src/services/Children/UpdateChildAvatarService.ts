import { getRepository } from 'typeorm';

import Children from '../../models/Children';

import AppError from '../../errors/AppError';
import { deleteImage } from '../Firebase/FileUtils';

interface Request {
  child_id: number;
  avatar: string;
  user_id: number;
}

class UpdateChildAvatarService {
  async execute({ child_id, avatar, user_id }: Request): Promise<void> {
    const usersRepository = getRepository(Children);

    const findChild = await usersRepository.find({
      where: {
        user_id: user_id,
        id: child_id
      }
    });

    if (findChild[0].id > 0) {
      if(findChild[0].avatar !== null && findChild[0].avatar !== undefined) {
        deleteImage(findChild[0].avatar, async (url: string | null) => {
          console.log("Deletado");
        });
      }
    } else {
      throw new AppError("Erro!", 400);
    }

    const updateChildBody = {
      avatar,
    }

    await usersRepository.update(child_id, updateChildBody);
  }
}

export default UpdateChildAvatarService;