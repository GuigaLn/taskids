import { getRepository } from 'typeorm';

import HistoricPurchase from '../../models/HistoricPurchase';

interface Request {
  child_id: number;
}

class ListHistoricPurchaseService {
  async execute({ child_id }: Request): Promise<HistoricPurchase[]> {
    const usersRepository = getRepository(HistoricPurchase);

    const findHistoric = await usersRepository.find({
   
      where: {
        child_id: child_id,
      }
    });
    
    return findHistoric;
  }

  async realized({ child_id }: Request): Promise<HistoricPurchase[]> {
    const usersRepository = getRepository(HistoricPurchase);

    const findHistoric = await usersRepository.find({
   
      where: {
        child_id: child_id,
        realized: true
      }
    });
    
    return findHistoric;
  }

  async notrealized({ child_id }: Request): Promise<HistoricPurchase[]> {
    const usersRepository = getRepository(HistoricPurchase);

    const findHistoric = await usersRepository.find({
   
      where: {
        child_id: child_id,
        realized: false
      }
    });
    
    return findHistoric;
  }
}

export default ListHistoricPurchaseService;