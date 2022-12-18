import { validationResult } from 'express-validator/check/index.js';

import { __dirname } from "../../index.js";
import { ApiError } from '../../models/ApiError.js';
import { Book } from "../../models/Book.js"



export const addBookController = (req, res, next) => {
   try {
      const book = req.body;  
      const isCommentAllowed = book.allowComments ? true : false;  

      const validationErrors = validationResult(req);

      if(!validationErrors.isEmpty()){
      return res.status(422).render("admin/books-create", {
            layout: 'admin/books-create',
            errors: validationErrors.array(),
         });
      }

      const imageFile = req.file; 

      if(!imageFile){
         res.status(422).render("admin/books-create", {
               layout: 'admin/books-create',
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
            imageUrl: "/uploads/"+ imageFile.filename
         });
      
         nextBook.save()
            .then(book => {
               req.flash("successMessage", "books added succesfully");
               res.redirect("/admin/books-list")
            })
            .catch(err => next(ApiError.internal({ msg: "Book not saved", err })))
         }
      } 
      catch(err){
         next(ApiError.internal({ msg: "Book not saved", err }));
      }
   
}








