import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";

export const getBookController = (req, res, next) => {
   try{ 
      Book
         .find({})
         .populate("category")
         .exec((err, booksRes) => { 
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
            }))
            
            res.render("admin/books-list", {
               layout: 'admin/books-list',
               books
            });
         }) 
   }
   catch(err){
      next(ApiError.internal({msg: "book not found", err}))
   }

}
