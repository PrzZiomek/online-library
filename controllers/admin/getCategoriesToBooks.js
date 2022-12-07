import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";

/** UNUSEDF!!!!!!!! */
export const getCategoriesToBooks = (req, res, next) => {  
   try{
      Category
         .find()
         .then(cats =>{ 
            const categories = cats.map(cat => ({
               id: cat._id,
               title: cat.title
            }));
            
            res.render("categories/admin/index", {
               layout: 'categories/admin/index',
               categories,
               name: userName,
               csrfToken: req.csrfToken()
            })}
         )
   }
   catch(err){
      next(ApiError.internal({msg: "category not found", err}))
   }
}
