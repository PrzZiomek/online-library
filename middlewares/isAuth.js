
export const isAuth = (req, res, next) => { 
   const locals = req.app.locals; 

   if(!locals.userAuthorized){
      return res.status(404).render("user/login",  {
         layout: 'user/login',
         errors: [{ msg: "first log in please" }]
      });
   };

   next();
}