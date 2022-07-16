import { request, response } from 'express';
import { getRepository } from 'typeorm';
import Children from '../../models/Children';

import HistoricPurchase from '../../models/HistoricPurchase';

interface Request {
  id_int: number;
}

class ValidateHistoricPurchaseService {
  async execute({ id_int }: Request): Promise<void> {
    const updateHistoricBody = {
      realized: true
    }

    const historicRepository = getRepository(HistoricPurchase);

    const findPurchase = await historicRepository.findOne({
      where: {
        id: id_int
      }
    });

    if (findPurchase?.realized) { 
      return;
    }

    await historicRepository.update(id_int, updateHistoricBody);

  }
}

export default ValidateHistoricPurchaseService;