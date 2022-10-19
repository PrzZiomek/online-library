import { Category } from "../../models/Category.js";

export const getCategories = (req, res) => {  
   Category.find().then(cats =>{ 
      const categories = cats.map(cat => ({
         id: cat._id,
         title: cat.title
      }));
      
      res.render("categories/admin/index", {
         layout: 'categories/admin/index',
         categories
      })}
   );
}
