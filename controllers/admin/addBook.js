import { Book } from "../../models/Book.js"

export const addBookController = (req, res) => {

   const isCommentAllowed = req.body.allowComments ? true : false;  

   const nextBook = new Book({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,  
      comments: req.body.comments,
      isCommentAllowed
   });

   nextBook.save().then(book => {
      req.flash("successMessage", "books added succesfully");
      res.redirect("/admin/books")
   }) 
}
