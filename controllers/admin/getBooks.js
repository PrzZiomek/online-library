import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";

export const getBookController = (req, res, next) => {

      const userName = req.app.locals.userName; 

      Book
         .find({})
         .populate("category")
         .exec((err, booksRes) => { 
            try{ 
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
               books,
               name: userName,
               csrfToken: req.csrfToken()
            });
            
            } catch(err){
               next(ApiError.internal({msg: "book not found", err}))
            }
         }) 
   }
  


