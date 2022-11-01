import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check/index.js';

import { User } from "../../models/User.js";


export const loginPostController = async (req, res) => {
   const body = req.body;
   const validationErrors = validationResult(req);

   if(!validationErrors.isEmpty()){
      res.status(422).render("login", {
         layout: 'login',
         errors: validationErrors.array(),
      });
   }
   else{
      const user = await User.findOne({ email: body.email });
      if(user == null){
         return res.status(400).render("login",  {
            layout: 'login',
            errors: [{ msg: "user not found" }]
         });
      };
     
      try {
         const hasMatched =  await bcrypt.compare(body.password, user.password);

         if(!hasMatched){
            res.status(401).render('login', {
               layout: 'login',
               errors: [{ msg: "login failed! Check your password or email" }] 
            });
         }
         else{ 
            req.app.locals.userAuthorized = true; 
            res.redirect("admin/index");
         }  
      }
      catch(err){
         console.log("authorization process failed", err);
      }
   }
  

}
