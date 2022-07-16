import { Router } from 'express';

import CreateChildrenService from '../services/Children/CreateChildrenService';
import ListChildrenService from '../services/Children/ListChildrenService';
import DetailChildrenService from '../services/Children/DetailChildrenService';
import AlterChildrenService from '../services/Children/AlterChildrenService';
import UpdateChildAvatarService from '../services/Children/UpdateChildAvatarService';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { uploadImage, deleteImage } from '../services/Firebase/FileUtils';

const upload = multer(uploadConfig);

interface urlFilename {
  url: string,
  pathBucket: string
}


const childrenRouter = Router();

childrenRouter.use(ensureAuthenticated);

childrenRouter.post('/', async (Request, Response) => {

  const { name, currency } = Request.body;
  const user_id = Request.user;

  const createChildren = new CreateChildrenService();

  const child = await createChildren.execute({
    name,
    currency,
    user_id,
  });
    
  return Response.json(child);
});

childrenRouter.get('/', async (Request, Response) => {
  const user_id = Request.user;
  
  const listChildren = new ListChildrenService();

  const child = await listChildren.execute({ user_id });

  return Response.json(child);
});

childrenRouter.get('/detalhe/:id', async (Request, Response) => {
  const user_id = Request.user;
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const detailChildren = new DetailChildrenService();

  const child = await detailChildren.execute({ id_int, user_id });

  return Response.json(child);
});

childrenRouter.put('/', async (Request, Response) => {

  const { id_int, name, currency, value } = Request.body;
  const user_id = Request.user;

  const alterChildren = new AlterChildrenService();

  await alterChildren.execute({
    id_int,
    name,
    currency,
    value,
    user_id,
  });
    
  return Response.json(Request.body);
});

childrenRouter.put('/updateAvatar', upload.single('image'), async (Request, Response) => {
  uploadImage(Request, 'avatar/', async (cb: urlFilename) => {
    if (cb !== null) {
      const { child_id } = Request.body;
      const user_id = Request.user;
      const updateChildren = new UpdateChildAvatarService();
    
      await updateChildren.execute({
        child_id,
        avatar: cb.url,
        user_id
      });
        
      return Response.json({ avatar: cb.url });
    }
  });
});

export default childrenRouter;