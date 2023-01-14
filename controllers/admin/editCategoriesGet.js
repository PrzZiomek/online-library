import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";

export const editCategoriesGetController = async (req, res, next) => {
   try{
      const id = req.params.id;
      const cats = await Category.find();
      const userName = req.app.locals.userName; 

      Category
         .findById(id)
         .then(cat =>{ 

            const category = {
               id: cat._id,
               title: cat.title
            };
            const categories = cats.map(cat => ({
               id: cat._id,
               title: cat.title
            }));    

            res.render('categories/admin/index', {
               layout: 'categories/admin/index',
               category,
               categories,
               name: userName,
               csrfToken: req.csrfToken()
            });
         })
         .catch(err => next(ApiError.internal({msg: "category not found", err})));
   }
   catch(err){
      next(ApiError.internal({msg: "category not found", err}));
   }
}
