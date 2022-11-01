import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check/index.js';

import { User } from "../../models/User.js";


export const registerPostController = async (req, res) => {
   const validationErrors = validationResult(req);

   if(!validationErrors.isEmpty()){
      res.status(422).render("register", {
         layout: 'register',
         errors: validationErrors.array(),
       //  firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // email: req.body.email,
      });
   }
   else{
      const user = await User.findOne({ email: req.body.email })
      
      if(user){
         req.flash("successMessage", "you are logged");
         res.redirect("login")
      }
      else{
         const newUser = new User(req.body);

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               newUser.password = hash;

               newUser.save().then(user => req.flash("successMessage", "you are registered "+ user.firstName)) ;
               res.redirect("login");
            })
         })
      }
   }
   
}
