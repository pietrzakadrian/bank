import { Router } from "express";

// Import controllers
import * as welcomeController from "./controllers/welcome.controller";
import usersRouter from "./controllers/users.controller";
import utilsRouter from "./controllers/utils.controller";
import registerRouter from "./controllers/register.controller";
import loginRouter from "./controllers/login.controller";

// Import middlewares
import { AuthHandler } from "./middlewares/authHandler.middleware";

const auth = new AuthHandler();
const router: Router = Router();

router.get("/", welcomeController.index);
router.use("/Auth", [registerRouter, loginRouter]);
router.use("/utils", utilsRouter);
router.use("/users", auth.authenticate(), usersRouter);

export default router;
