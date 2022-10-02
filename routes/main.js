import { Router } from "express";
import { homeController } from "../controllers/home.js";
import { loginController } from "../controllers/login.js";
import { loginPostController } from "../controllers/loginPost.js";
import { registerController } from "../controllers/register.js";
import { registerPostController } from "../controllers/registerPost.js";

const router = Router();

router.get('/', homeController);

router.route('/login')
   .get(loginController)
   .post(loginPostController);

router.route('/register')
   .get(registerController)
   .post(registerPostController);


export const routes = router;