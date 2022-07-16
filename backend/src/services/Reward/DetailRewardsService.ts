import { getRepository, IsNull } from 'typeorm';

import Rewards from '../../models/Rewards';

import AppError from '../../errors/AppError';

interface Request {
  id_int: number;
  user_id: number;
}

class DetailRewardsService {
  async execute({ id_int, user_id }: Request): Promise<Rewards[]> {
    const rewardRepository = getRepository(Rewards);

    const findReward = await rewardRepository.find({
      where: {
        user_id: user_id,
        id: id_int
      }
    });

    if (findReward[0].id > 0) {
      
    } else {
      throw new AppError("Erro!", 400);
    }

    findReward[0].image = `${findReward[0].image}`;

    return findReward;
  }
}

export default DetailRewardsService;