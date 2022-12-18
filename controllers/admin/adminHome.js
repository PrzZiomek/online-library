
export const adminHomeController = (req, res) => { 
   try{
      const isLoginSuccessfull = req.app.locals.userAuthorized; 
      const userName = req.app.locals.userName; 

      if(!isLoginSuccessfull){ 
         res.redirect("/user/login");
      }
      else{
         res.render('admin/index', {
            layout: 'admin/index',
            name: userName,
            csrfToken: req.csrfToken()
         });
         
      }
   }
   catch(err){
      next(ApiError.internal({ msg: "error when loading main page", err }))
   }
}
