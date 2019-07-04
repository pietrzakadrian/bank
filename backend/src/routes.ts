import { Router } from "express";
import usersRouter from "./controllers/users.controller";
import utilsRouter from "./controllers/utils.controller";
import * as welcomeController from "./controllers/welcome.controller";
import registerRouter from "./controllers/register.controller";
import { AuthHandler } from "./middlewares/authHandler.middleware";
import loginRouter from "./controllers/login.controller";

const auth = new AuthHandler();
const router: Router = Router();

router.get("/", welcomeController.index);
router.use("/utils", utilsRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/users", auth.authenticate(), usersRouter);

export default router;
