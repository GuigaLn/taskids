import { getRepository } from 'typeorm';

import Rewards from '../../models/Rewards';

interface Request {
  user_id: number;
}

class ListRewardsService {
  async execute({ user_id }: Request): Promise<Rewards[]> {
    const rewardsRepository = getRepository(Rewards);

    const findReward = await rewardsRepository.find({
      where: {
        user_id: user_id
      }
    });

    findReward.map(findReward => {
      findReward.image = `${findReward.image}`;
    });

    return findReward;
  }
}

export default ListRewardsService;