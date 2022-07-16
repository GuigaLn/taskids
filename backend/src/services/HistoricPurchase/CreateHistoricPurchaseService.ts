import { getRepository } from 'typeorm';

import HistoricPurchase from '../../models/HistoricPurchase';
import Children from '../../models/Children';
import Child from '../../models/Children';
import AppError from '../../errors/AppError';

interface Request {
  product_name: string;
  amount: number;
  image: string;
  child_id: number;
}

class CreateHistoricPurchaseService {
  async execute({ product_name, amount, image, child_id }: Request): Promise<void> {

    const childRepository = getRepository(Children);

    const findChild = await childRepository.findOne({
      where: {
        id: child_id
      }
    });

    const valueChild = Number(findChild?.value);

    if (valueChild >= amount) {
      const updateChildBody = {
        value: valueChild - amount
      }

      await childRepository.update(child_id, updateChildBody);

      const historicRepository = getRepository(HistoricPurchase);

      const product = historicRepository.create({
        product_name,
        amount,
        image,
        child_id
      });

      await historicRepository.save(product);
      
    } else {
      throw new AppError('Saldo Insuficiente!', 401);
    }
    
  }
}

export default CreateHistoricPurchaseService;