import { Category } from "../../models/Category.js";

export const createBookController = (_, res) => {

   Category.find()
      .then(cats =>{ 
         const categories = cats.map(cat => ({
            id: cat._id,
            title: cat.title
         }));

         res.render("admin/books-create", { 
            layout: "admin/books-create",
            categories
         });  
      })
      .catch(err => err);
}
