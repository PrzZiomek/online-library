
export const isUserAuthenticated = (req, res, next) => {
 /*  if(req.isAuthenticated()){
      next()
   }
   else{
      res.redirect("/login ")
   } */

   next();
}