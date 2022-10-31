
export const adminHomeController = (req, res) => { 
   const isLoginSuccessfull = req.app.locals.userAuthorized;

   if(!isLoginSuccessfull){ 
      res.redirect("login", {
         layout: 'login',
         isLoginSuccessfull
      });
   }
   else{
      res.render('admin/index', {layout: 'admin/index'});
   }
   
}
