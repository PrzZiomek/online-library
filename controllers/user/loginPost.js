import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check/index.js';
import { ApiError } from '../../models/ApiError.js';

import { User } from "../../models/User.js";


export const loginPostController = async (req, res, next) => {
   try{
      const body = req.body;
      const validationErrors = validationResult(req);

      if(!validationErrors.isEmpty()){
         res.status(422).render("user/login", {
            layout: 'user/login',
            errors: validationErrors.array(),
         });
      }
      else{
         const user = await User.findOne({ email: body.email }).catch(err => next(ApiError.internal({msg: "error when getting comments", err})));

         if(user == null){
            return res.status(400).render("user/login",  {
               layout: 'user/login',
               errors: [{ msg: "user not found" }]
            });
         };
      
         const hasMatched =  await bcrypt.compare(body.password, user.password).catch(err => next(ApiError.internal({msg: "error when logging", err})));

         if(!hasMatched){
            res.status(401).render('user/login', {
               layout: 'user/login',
               errors: [{ msg: "login failed! Check your password or email" }] 
            });
         }
         else{ 
            req.app.locals.userAuthorized = true; 
            req.app.locals.userName = user.firstName;
            req.app.locals.userLastName = user.lastName;
            req.app.locals.userEmail = user.email;

            res.redirect("/admin/index");
         }  
      }
     
   }
   catch(err){
      next(ApiError.internal({msg: "authorization process failed", err}))
   }

}
