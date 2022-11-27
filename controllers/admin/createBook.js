import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";


export const createBookController = (req, res, next) => {

   Category.find()
      .then(cats =>{ 
         const categories = cats.map(cat => ({
            id: cat._id,
            title: cat.title
         }));

         res.render("admin/books-create", { 
            layout: "admin/books-create",
            categories
         });  
      })
      .catch(err => next(ApiError.internal({msg: "Books not loaded", err})));
}
