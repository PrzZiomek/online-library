import bcrypt from 'bcryptjs';

import { User } from "../../models/User.js";


export const registerPostController = async (req, res) => {
   let errors = [];

   if(!req.body.firstName){
      errors.push({ message: "First name is mandatory" })
   }
   if(!req.body.lastName){
      errors.push({ message: "second name is mandatory" })
   }
   if(!req.body.email){
      errors.push({ message: "email is mandatory" })
   }
   if(req.body.password !== req.body.passwordConfirm ){
      errors.push({ message: "passwords must get matched" })
   }

   if(errors.length){
      res.render("register", {
         layout: 'register',
         errors,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
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
