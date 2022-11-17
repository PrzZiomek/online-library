import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check/index.js';

import { User } from "../../models/User.js";


export const registerPostController = async (req, res) => {
   const validationErrors = validationResult(req);

   if(!validationErrors.isEmpty()){
      res.status(422).render("user/register", {
         layout: 'user/register',
         errors: validationErrors.array(),
      });
   }
   else{
      const user = await User
         .findOne({ email: req.body.email })
         .catch(err => err);
      
      if(user){
         req.flash("successMessage", "you are logged");
         res.redirect("/user/login")
      }
      else{
         const newUser = new User(req.body);

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               newUser.password = hash;

               newUser
                  .save()
                  .then(user => req.flash("successMessage", "you are registered "+ user.firstName))
                  .catch(err => err) ;
                  
               res.redirect("/user/login");
            })
         })
      }
   }
   
}
