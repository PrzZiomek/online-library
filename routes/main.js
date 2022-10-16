import { Router } from "express";
import { addBookController } from "../controllers/admin/addBook.js";
import { adminHomeController } from "../controllers/admin/adminHome.js";
import { createBookController } from "../controllers/admin/createBook.js";
import { editBookController } from "../controllers/admin/editBook.js";
import { getBookController } from "../controllers/admin/getBooks.js";
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
   .get(adminHomeController);

router.route('/admin/books')
   .get(getBookController);

router.route('/admin/books-create')
   .get(createBookController)
   .post(addBookController) 

router.route('/admin/books-edit/:id')
   .get(editBookController)

export const routes = router;     