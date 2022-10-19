import { Book } from "../../models/Book.js"

export const addBookController = (req, res) => {
   const book = req.body;  
   const isCommentAllowed = book.allowComments ? true : false;  

   const nextBook = new Book({
      title: book.title,
      description: book.description,
      status: book.status,  
      comments: book.comments,
      isCommentAllowed,
      category: book.category
   });

   nextBook.save().then(book => {
      req.flash("successMessage", "books added succesfully");
      res.redirect("/admin/books")
   }) 
}
