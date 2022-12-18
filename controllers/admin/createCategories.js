import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";


export const createCategories = async (req, res, next) => {
   try{
      const categoryName = req.body.title;
      const existingCategory = await Category.findOne({title: categoryName});

      if(existingCategory) return;

      if(categoryName){ //to do: cat description
         const newCategory = new Category({
            title: categoryName
         }); 

         newCategory.save()
            .then(() => {  
               res.redirect("/admin/categories");
            })
            .catch(err =>  next(ApiError.internal({msg: "category not saved", err})));
      }
   }
   catch{
      next(ApiError.internal({msg: "error when saving category", err}));
   }
   
}
