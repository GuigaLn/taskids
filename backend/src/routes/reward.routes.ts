import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateRewardsService from '../services/Reward/CreateRewardsService';
import DeleteRewardsService from '../services/Reward/DeleteRewardsService';
import DetailRewardsService from '../services/Reward/DetailRewardsService';
import ListRewardsService from '../services/Reward/ListRewardsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { deleteImage, uploadImage } from '../services/Firebase/FileUtils';

const rewardsRouter = Router();
const upload = multer(uploadConfig);

interface urlFilename {
  url: string,
  pathBucket: string
}

rewardsRouter.use(ensureAuthenticated);

rewardsRouter.post('/', upload.single('image'), async (Request, Response) => {

  uploadImage(Request, 'images/', async (cb: urlFilename) => {
    if (cb !== null) {
      const { title, description, value } = Request.body;
      const user_id = Request.user;
      const createRewards = new CreateRewardsService();
    
      const reward = await createRewards.execute({
        title,
        description,
        value,
        filename: cb.pathBucket,
        image: cb.url,
        user_id,
      });
        
      return Response.json(reward);

    }
  });
});

rewardsRouter.get('/', async (Request, Response) => {
  const user_id = Request.user;

  const listRewards = new ListRewardsService();

  const reward = await listRewards.execute({ user_id });

  return Response.json(reward);
});

rewardsRouter.get('/detalhe/:id', async (Request, Response) => {
  const user_id = Request.user;
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const detailRewards = new DetailRewardsService();

  const reward = await detailRewards.execute({ id_int, user_id });

  return Response.json(reward);
});

rewardsRouter.delete('/delete/:id', async (Request, Response) => {
  const user_id = Request.user;
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const detailRewards = new DetailRewardsService();
  const reward = await detailRewards.execute({ id_int, user_id });

  deleteImage(reward[0].image, async (url: string | null) => {
    console.log("Deletado");
  });

  const deleteRewards = new DeleteRewardsService();

  await deleteRewards.execute({ id_int, user_id });

  return Response.json("Deletado!");
});

export default rewardsRouter;