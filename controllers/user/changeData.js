
export const changeDataController = (req, res) => { 
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
};


