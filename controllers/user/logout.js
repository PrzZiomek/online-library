
export const logoutController = (req, res) => {
   const locals = req.app.locals;
   locals.userAuthorized = false; 
   locals.userName = ""; 

   res.redirect("/user/login");
}