import { Router } from "express";
import { adminHomeController } from "../controllers/admin/adminHome.js";
import { homeController } from "../controllers/user/home.js";
import { loginController } from "../controllers/user/login.js";
import { loginPostController } from "../controllers/user/loginPost.js";
import { registerController } from "../controllers/user/register.js";
import { registerPostController } from "../controllers/user/registerPost.js";

const router = Router();

/** user routes */

router.route("/")
   .get(homeController);

router.route('/login')
   .get(loginController)
   .post(loginPostController);

router.route('/register')
   .get(registerController)
   .post(registerPostController);

   
/** admin routes */

router.route('/index-admin')
   .get(adminHomeController)

router.route('/posts')
   .get()
   .post()

export const userRoutes = router;