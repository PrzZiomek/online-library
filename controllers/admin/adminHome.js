
export const adminHomeController = (req, res) => { 
   const isLoginSuccessfull = req.app.locals.userAuthorized; 
   const userName = req.app.locals.userName; console.log("req.app.locals.", req.app.locals);
 //  console.log("isLoginSuccessfull", isLoginSuccessfull); console.log("req.app.locals.", req.app.locals);
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
