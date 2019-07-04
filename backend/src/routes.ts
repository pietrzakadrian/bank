import { Router } from 'express';
import usersRouter from './controllers/usersController';
import utilsRouter from './controllers/utilsController';
import * as welcomeController from './controllers/welcomeController';
import signupRouter from './controllers/signupController';
import { AuthHandler } from './middlewares/authHandler';
import loginRouter from './controllers/loginController';

const auth = new AuthHandler();
const router: Router = Router();

router.get('/', welcomeController.index);
router.use('/utils', utilsRouter);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/users', auth.authenticate(), usersRouter);

export default router;
