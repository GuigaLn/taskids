import { getRepository } from 'typeorm';

import Rewards from '../../models/Rewards';

interface Request {
  title: string;
  description: string;
  value: number;
  filename: string;
  image: string;
  user_id: number;
}

class CreateRewardsService {
  async execute({ title, description, value, filename, image, user_id}: Request): Promise<Rewards> {
    const rewardRepository = getRepository(Rewards);

    const rewards = rewardRepository.create({
      title,
      description,
      value,
      filename,
      image,  
      user_id
    });

    await rewardRepository.save(rewards);

    return rewards;
  }
}

export default CreateRewardsService;