
export const isAuth = (req, res, next) => { // to do: use req.session instead!
   const locals = req.app.locals;

   if(!locals.userAuthorized){
      return res.status(400).render("user/login",  {
         layout: 'user/login',
         errors: [{ msg: "first log in please" }]
      });
   };

   next();
}