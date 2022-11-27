import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";

export const getCategories = (req, res, next) => {  
   try{
      const userName = req.app.locals.userName; 

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
               userName
            })}
         )
   }
   catch(err){
      next(ApiError.internal({msg: "category not found", err}))
   }
}
