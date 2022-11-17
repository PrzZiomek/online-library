import { Category } from "../../models/Category.js";

export const createCategories = async (req, res) => {
   const categoryName = req.body.title;
 //  const userName = req.app.locals.userName; 
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
         .catch(err => err)
   }
   
}
