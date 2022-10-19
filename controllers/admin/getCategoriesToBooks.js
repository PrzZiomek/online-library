import { Category } from "../../models/Category.js";

/** UNUSEDF!!!!!!!! */
export const getCategoriesToBooks = (req, res) => {  

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
