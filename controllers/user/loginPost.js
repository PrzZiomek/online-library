import bcrypt from 'bcryptjs';
import { append } from 'vary';

import { User } from "../../models/User.js";


export const loginPostController = async (req, res) => {
   const body = req.body;

   const user = await User.findOne({ email: body.email });
   if(user == null){
   //   res.render('admin/index', {layout: 'admin/index'});
   //   console.log("login failed! Check your password or email");
      return res.status(400).send("cannot find the user");
   };
  
   try {
      const hasMatched =  await bcrypt.compare(body.password, user.password);

      if(!hasMatched){
         res.render('admin/index', {layout: 'admin/index'});
         console.log("login failed! Check your password or email");
      }  

      req.app.locals.userAuthorized = true; 
      res.redirect("admin/index");
   }
   catch{
      res.status(500)
   }

}
