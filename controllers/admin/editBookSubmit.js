import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";

export const editBookSubmitController = (req, res, next) => {
   try{
      const bodyBook = req.body;
      const isCommentAllowed = bodyBook.allowComments ? true : false;  
      const id = req.params.id; 
      
      Book.findById(id)
         .then(book => {
            book.title = bodyBook.title;
            book.status = bodyBook.status;
            book.isCommentAllowed = isCommentAllowed;
            book.description = bodyBook.description;
            book.category = bodyBook.category;

            book.save().then(updatedBook => {
               req.flash("successMessage", `book ${updatedBook} added succesfully`);
               res.redirect("/admin/books-list"); 
            })
         })
         .catch(err => next(ApiError.internal({msg: "Books not found", err})));
   }
   catch(err){
      next(ApiError.internal({msg: "error when looking for Books", err}));
   }
}