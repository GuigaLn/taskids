import { getRepository, IsNull } from 'typeorm';

import Rewards from '../../models/Rewards';

import AppError from '../../errors/AppError';

interface Request {
  id_int: number;
  user_id: number;
}

class DeleteRewardsService {
  async execute({ id_int, user_id }: Request): Promise<void> {
    const rewardRepository = getRepository(Rewards);

    await rewardRepository.delete({ user_id: user_id, id: id_int });
  }
}

export default DeleteRewardsService;