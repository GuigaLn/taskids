import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (Request, Response) => {
  console.log(1)
  const { name, email, password, phone } = Request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    phone
  });

  user.password = 'Criptografado';
    
  return Response.json(user);
});

export default usersRouter;