import { Category } from "../../models/Category.js";

export const createCategories = (req, res) => {
   const categoryName = req.body.title;

   if(categoryName){
      const newCategory = new Category({
         title: categoryName
      });

      newCategory.save().then(cats => {

         res.render("categories/admin/index", {
            layout: 'categories/admin/index',
            categories: cats
         });
      })
   }

}
