import { ApiError } from "../../models/ApiError.js";

export const changeDataController = (req, res) => { 
  try{
    const locals = req.app.locals;
    const user = {
      firstName: locals.userName,
      lastName: locals.userLastName,
      email: locals.userEmail,
      description: locals?.description
    }

    res.render("admin/account-data", {
      layout: 'admin/account-data', 
      user
    });
  }
  catch(err){
    next(ApiError.internal({msg: "error when changing user data", err}));
  }

};


