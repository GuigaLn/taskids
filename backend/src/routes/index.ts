import { Router } from 'express';

import childrenRouter from './child.routes';
import purchaseRoute from './purchase.routes';
import rewardRouter from './reward.routes';
import sessionsRouter from './sessions.routes';
import taskRouter from './task.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/children', childrenRouter);
routes.use('/task', taskRouter);
routes.use('/reward', rewardRouter);
routes.use('/purchase', purchaseRoute);

export default routes;