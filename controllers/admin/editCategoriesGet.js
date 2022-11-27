import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";

export const editCategoriesGetController = async (req, res, next) => {
   try{
      const id = req.params.id;
      const cats = await Category.find();

      Category
         .findById(id)
         .then(cat =>{ 
            const category = {
               id: cat._id,
               title: cat.title
            };

            res.render('categories/admin/index', {
               layout: 'categories/admin/index',
               category,
               categories: cats
            });
         })
   }
   catch(err){
      next(ApiError.internal({msg: "category not found", err}))
   }
}
