
export const adminHomeController = (req, res) => { 
   const isLoginSuccessfull = req.app.locals.userAuthorized; 

   if(!isLoginSuccessfull){ 
      res.redirect("/login");
   }
   else{
      res.render('admin/index', {layout: 'admin/index'});
   }
   
}
