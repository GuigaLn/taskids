import { Router } from 'express';

import CreateHistoricPurchaseService from '../services/HistoricPurchase/CreateHistoricPurchaseService';
import ListHistoricPurchaseService from '../services/HistoricPurchase/ListHistoricPurchaseService';
import ValidateHistoricPurchaseService from '../services/HistoricPurchase/ValidateHistoricPurchaseService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const purchaseRouter = Router();

purchaseRouter.use(ensureAuthenticated);

purchaseRouter.post('/', async (Request, Response) => {
  const { product_name, amount, image, child_id } = Request.body;
  

  const createPurchase = new CreateHistoricPurchaseService();

  const product = await createPurchase.execute({
    product_name,
    amount,
    image,
    child_id
  });

  return Response.json(product);
});

purchaseRouter.get('/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const listHistoric = new ListHistoricPurchaseService();

  const historic = await listHistoric.execute({ child_id: id_int });

  return Response.json(historic);
});

purchaseRouter.get('/realized/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const listHistoric = new ListHistoricPurchaseService();

  const historic = await listHistoric.realized({ child_id: id_int });

  return Response.json(historic);
});

purchaseRouter.get('/notrealized/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const listHistoric = new ListHistoricPurchaseService();

  const historic = await listHistoric.notrealized({ child_id: id_int });

  return Response.json(historic);
});

purchaseRouter.put('/validate/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const validateHistoric = new ValidateHistoricPurchaseService();

  await validateHistoric.execute({ id_int });

  return Response.json("Atualizado");
});

export default purchaseRouter;