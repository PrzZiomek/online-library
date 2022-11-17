import { User } from "../../models/User.js";

export const changeAdminDataController = (req, res) => {
   const userBody = req.body; 
   const locals = req.app.locals;

   User.findOne({email: locals.userEmail})
      .then(user => { console.log("found", user);
         // user.image = userBody.image; to do: add image option for user
         // user.description = userBody.description; to do: add description option for user
         if(userBody.firstName) user.firstName = userBody.firstName;
         if(userBody.lastName) user.lastName = userBody.lastName;
         if(userBody.email) user.email = userBody.email;
         if(userBody.password) user.password = userBody.password;

         user.save().then(updatedUser => {
            req.flash("successMessage", `user ${updatedUser} added succesfully`);
            const userNewData = {
               firstName: updatedUser.firstName,
               lastName: updatedUser.lastName,
               email: updatedUser.email,
               description: updatedUser.description
             }

            res.render("admin/account-data", {
               layout: 'admin/account-data', 
               user: userNewData
            });
         })
         .catch(err => err)
      })
      .catch(err => console.log("error when changing user data:", err)); 
}
