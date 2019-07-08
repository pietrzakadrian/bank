import { Router } from "express";

// Import Controllers
import * as welcomeController from "./controllers/welcome.controller";
import usersRouter from "./controllers/users.controller";
import utilsRouter from "./controllers/utils.controller";
import registerRouter from "./controllers/register.controller";
import loginRouter from "./controllers/login.controller";
import logoutRouter from "./controllers/logout.controller";

// Import Middlewares
import { AuthHandler } from "./middlewares/authHandler.middleware";

const auth = new AuthHandler();
const router: Router = Router();

router.use("/Auth", [registerRouter, loginRouter, logoutRouter]);
router.use("/users", usersRouter);
// router.use("/bills", billsRouter);
// router.use("/transactions", transactionsRouter);
// router.use("/additionals", additionalsRouter);
// router.use("/currency", currencyRouter);

router.use("/utils", utilsRouter);

export default router;
