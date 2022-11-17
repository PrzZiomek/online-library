import { Category } from "../../models/Category.js";

export const editCategoriesGetController = async (req, res) => {
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
      .catch(err => err);
  
}
