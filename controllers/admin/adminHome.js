
export const adminHomeController = (req, res) => { 
   const isLoginSuccessfull = req.app.locals.userAuthorized; 
   const userName = req.app.locals.userName;

   if(!isLoginSuccessfull){ 
      res.redirect("/user/login");
   }
   else{
      res.render('admin/index', {
         layout: 'admin/index',
         name: userName
      });
   }
   
}
