//import bcrypt from 'bcryptjs';
const ApiError = require('./ApiError');
const User =  require("./User");


 const loginPostController = async (req, res, next) => {
   try{
      const body = req.body;
      const user = await User.findOne({ email: body.email }).catch(err => {throw Error(err)})
         //.catch(err => next(ApiError.internal({msg: "authorization process failed", err})));

      if(user == null){ throw Error("no user!!!"); 
         return res.status(400).render("user/login",  {
            layout: 'user/login',
            errors: [{ msg: "user not found" }]
         });
      };
   
    /*  const hasMatched =  await bcrypt.compare(body.password, user.password);

      if(!hasMatched){
         res.status(401).render('user/login', {
            layout: 'user/login',
            errors: [{ msg: "login failed! Check your password or email" }] 
         });
      }
      else{ 
         */
         req.app.locals.userAuthorized = true; 
         req.app.locals.userName = user.firstName;
         req.app.locals.userLastName = user.lastName;
         req.app.locals.userEmail = user.email;

        // res.redirect("/admin/index");
         return;
  //    }  
     
   }
   catch(err){
      next(ApiError.internal({msg: "authorization process failed", err}));
      return err;
   }

}

module.exports = loginPostController;