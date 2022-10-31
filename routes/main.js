import { Router } from "express";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';

import { addBookController } from "../controllers/admin/addBook.js";
import { adminHomeController } from "../controllers/admin/adminHome.js";
import { createBookController } from "../controllers/admin/createBook.js";
import { createCategories } from "../controllers/admin/createCategories.js";
import { deleteBookController } from "../controllers/admin/deleteBook.js";
import { deleteCategoryController } from "../controllers/admin/deleteCategory.js";
import { editBookController } from "../controllers/admin/editBook.js";
import { editBookSubmitController } from "../controllers/admin/editBookSubmit.js";
import { editCategoriesGetController } from "../controllers/admin/editCategoriesGet.js";
import { getBookController } from "../controllers/admin/getBooks.js";
import { getCategories } from "../controllers/admin/getCategories.js";
import { homeController } from "../controllers/user/home.js";
import { loginController } from "../controllers/user/login.js";
import { loginPostController } from "../controllers/user/loginPost.js";
import { registerController } from "../controllers/user/register.js";
import { registerPostController } from "../controllers/user/registerPost.js";
import { isUserAuthenticated } from "../helpers/isUserAuthenticated.js";
import { singleBookController } from "../controllers/user/singleBook.js";
import { getCommentsController } from '../controllers/admin/getComments.js';
import { sendCommitController } from "../controllers/user/sendCommit.js";


const router = Router();

router.all("/*", isUserAuthenticated);

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

router.route('/admin/index')
   .get(adminHomeController);

router.route('/admin/books')
   .get(getBookController);

router.route('/admin/books-create')
   .get(createBookController)
   .post(addBookController);

router.route('/admin/books-edit/:id')
   .get(editBookController)
   .put(editBookSubmitController);

router.route('/admin/books-delete/:id')
   .delete(deleteBookController);

router.route('/admin/comments')
   .get(getCommentsController);
   
/** categories */

router.route('/admin/categories')
   .get(getCategories)
   .post(createCategories);

router.route('/admin/categories-delete/:id')
   .delete(deleteCategoryController);

router.route('/admin/categories/edit/:id')
   .get(editCategoriesGetController)


// user panel

router.route("/book/:id")
   .get(singleBookController)
   .post(sendCommitController)

export const routes = router;     