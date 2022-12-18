import { ApiError } from '../../models/ApiError.js';

export const logoutController = (req, res) => {
   try{
      const locals = req.app.locals;
      locals.userAuthorized = false; 
      locals.userName = ""; 

      res.redirect("/user/login");
   }
   catch(err){
      next(ApiError.internal({msg: "error when logout process", err}));
   }
}