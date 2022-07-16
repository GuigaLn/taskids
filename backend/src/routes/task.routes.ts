import { Router, Request, Response, request, response } from 'express';

import CreateTaskService from '../services/Task/CreateTaskService';
import ListTaskServiceChild from '../services/Task/ListTaskServiceChild';
import ListTaskService from '../services/Task/ListTaskService';
import DetailTaskService from '../services/Task/DetailTaskService';
import ValidateTaskService from '../services/Task/ValidateTaskService';
import InvalidateTaskService from '../services/Task/InvalidateTaskService';
import TaskAswnerService from '../services/Task/TaskAswnerService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const taskRouter = Router();

taskRouter.use(ensureAuthenticated);

taskRouter.post('/', async (Request, Response) => {
  const { title, description, amount, answer, child_id } = Request.body;

  const user_id = Request.user;

  const createTask = new CreateTaskService();

  const task = await createTask.execute({
    title,
    description,
    amount,
    answer,
    child_id,
    user_id
  });

  return Response.json(task);
});

taskRouter.get('/', async (Request, Response) => {
  const user_id = Request.user;

  const listTask = new ListTaskService();

  const task = await listTask.execute({ user_id: user_id });

  return Response.json(task);
});

taskRouter.get('/child/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const listTask = new ListTaskServiceChild();

  const task = await listTask.execute({ child_id: id_int });

  return Response.json(task);
});

taskRouter.get('/detalhe/:id', async (Request, Response) => {
  const user_id = Request.user;
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const listTask = new DetailTaskService();

  const task = await listTask.execute({ id_int, user_id });

  return Response.json(task);
});

taskRouter.put('/validate/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const validateTask = new ValidateTaskService();

  await validateTask.execute({ id_int });

  return Response.json("Atualizado");
});

taskRouter.put('/invalidate/:id', async (Request, Response) => {
  const { id } = Request.params;

  const id_int = parseInt(id, 10);

  const invalidateTask = new InvalidateTaskService();

  await invalidateTask.execute({ id_int });

  return Response.json("Atualizado");
});

taskRouter.put('/aswner', async (Request, Response) => {
  const { id, aswner } = Request.body;

  const id_int = parseInt(id, 10);

  const aswnerService = new TaskAswnerService();

  const task = await aswnerService.execute({
    id_int,
    aswner
  });

  return Response.json(task);
});

export default taskRouter;