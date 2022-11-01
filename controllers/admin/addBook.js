import { validationResult } from 'express-validator/check/index.js';

import { checkIfEmpty } from "../../helpers/checkIfEmpty.js";
import { __dirname } from "../../index.js";
import { Book } from "../../models/Book.js"



export const addBookController = (req, res) => {
   const book = req.body;  
   const isCommentAllowed = book.allowComments ? true : false;  
   console.log("dir)", __dirname);

   const validationErrors = validationResult(req);

   if(!validationErrors.isEmpty()){
     return res.status(422).render("books-create", {
         layout: 'books-create',
         errors: validationErrors.array(),
      });
   }

   const imageFile = req.file; console.log("req.file", req.file);

   if(!imageFile){
      res.status(422).render("books-create", {
            layout: 'books-create',
            errors: [{ msg: "please use image format like: jpg, png, jpeg, svg" }],
         });
   }
   else{
      const nextBook = new Book({
         title: book.title,
         description: book.description,
         status: book.status,  
         comments: book.comments,
         isCommentAllowed,
         category: book.category,
         imageUrl: imageFile.path
      });
   
      nextBook.save().then(book => {
         req.flash("successMessage", "books added succesfully");
         res.redirect("/admin/books")
      }) 
   }
    
   
}








