import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";
import { Category } from "../../models/Category.js";


export const homeController = async (req, res, next) => {
   try{
      const booksRes = await Book.find().catch(err => next(ApiError.internal({msg: "ook not found", err})));
      
      const books = booksRes.map(book => ({
         title: book.title,
         description: book.description,
         id: book._id,
         tags: book.tags,
         status: book.status, 
         category: {
            title: book.category?.title
         },
         image: book.imageUrl
      }));

      const categoriesRes  = await Category.find().catch(err => next(ApiError.internal({msg: "Category not found", err})));

      const categories = categoriesRes.map(cat => ({
         id: cat._id,
         title: cat.title
      }));

      res.render('index', {
         layout: 'index',
         books,
         categories
      });

   }
   catch(err){
      next(ApiError.internal({msg: "data not found", err}))
   }
}
