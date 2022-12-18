import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";


export const createBookController = (req, res, next) => {
   try{
      const userName = req.app.locals.userName; 

      Category.find()
         .then(cats =>{ 
            const categories = cats.map(cat => ({
               id: cat._id,
               title: cat.title
            }));

            res.render("admin/books-create", { 
               layout: "admin/books-create",
               categories,
               name: userName,
               csrfToken: req.csrfToken()
            });  
         })
         .catch(err => next(ApiError.internal({msg: "category not found", err})));
   }
   catch(err){
      next(ApiError.internal({msg: "error when loading category", err}))
   }
}
