import { Router } from "express";
import {  check, body } from 'express-validator/check/index.js';
import rateLimit from 'express-rate-limit';
import csrf from 'csurf';

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
import { singleBookController } from "../controllers/user/singleBook.js";
import { getCommentsController } from '../controllers/admin/getComments.js';
import { sendCommitController } from "../controllers/user/sendCommit.js";
import { logoutController } from "../controllers/user/logout.js";
import { changeDataController } from "../controllers/user/changeData.js";
import { changeAdminDataController } from "../controllers/admin/changeAdminData.js";
import { isAuth } from "../middlewares/isAuth.js";

const limiter = rateLimit({
   max: 5,
   windowMs: 1000,
   message: "too many actions, please wait",
   standardHeaders: true, 
})
const router = Router();

const csrfProtection = csrf({ cookie: true });  

/** user routes */

router.route("/")
   .get(homeController);

router.route('/user/login')
   .get(loginController)
   .post(
      check("email")
      .isEmail()
      .withMessage("please enter the valid email")
      .normalizeEmail(),
      body(
         "password",
         "please enter the password with at least 3 and max 12 characters"
         )
         .trim()
         .isLength({ min: 3, max: 12 }),    
      limiter,
      loginPostController
   );


router.route('/user/register')
   .get(registerController)
   .post(
      check("email")
         .isEmail()
         .withMessage("please enter the valid email")
         .normalizeEmail(),
      body(
         "password",
         "please enter the password with at least 3 and max 12 characters"
         )
         .trim()
         .isLength({ min: 3, max: 12 }),    
      body(
         "firstName",
         "please enter the name with at least 2 and max 12 characters, without numbers"
         )
         .isLength({ min: 2, max: 12 })
         .isAlpha(),   
      body(
         "lastName",
         "please enter the last name with at least 2 and max 12 characters, without numbers"
         )
         .isLength({ min: 2, max: 12 })
         .isAlpha(),
      body("passwordConfirm")
         .trim() 
         .custom((value, { req }) => {
            if(value !== req.body.password){
               throw new Error("please repeat password");
            }
            return true;
         }),               
      limiter,
      registerPostController
   );

   
/** admin routes */

router.route('/admin/index')
   .get(
      isAuth,
      csrfProtection,
      adminHomeController
   );

router.route('/admin/books-list')
   .get( 
      isAuth,
      csrfProtection,
      getBookController
   );

router.route('/admin/books-create')
   .get(
      isAuth,
      csrfProtection,
      createBookController
   )
   .post(
      body(
         "title",
         "please enter the title with at least 2, without numbers"
         )
         .isLength({ min: 2, max: 100})
         .trim(),   
      body(
         "image",
         "please add a image that best fits your book"
         ),
      body(
         "description",
         "please addf some description, at least 5 chars"
         )
         .isLength({ min: 5, max: 400 }),   
      addBookController
      );

router.route('/admin/books-edit/:id')
   .get(
      isAuth,
      csrfProtection,
      editBookController
   )
   .put(editBookSubmitController);

router.route('/admin/books-delete/:id')
   .delete(deleteBookController);

router.route('/admin/comments')
   .get(
      isAuth,
      csrfProtection,
      getCommentsController
   );
   
/** categories */

router.route('/admin/categories')
   .get(
      isAuth,
      csrfProtection,
      getCategories
   )
   .post(createCategories);

router.route('/admin/categories-delete/:id')
   .delete(deleteCategoryController);

router.route('/admin/categories/edit/:id')
   .get(
      isAuth,
      csrfProtection,
      editCategoriesGetController
   )


// user panel

router.route("/book/:id")
   .get(
      singleBookController
   )
   .post(sendCommitController)

router.route("/user/logout")
   .get(
      isAuth,
      logoutController
   )
 
router.route("/admin/account-change")
   .get(
      isAuth,
      csrfProtection,
      changeDataController
   )
   .post(changeAdminDataController)

 
export const routes = router;     