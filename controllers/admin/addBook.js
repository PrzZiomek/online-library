import { checkIfEmpty } from "../../helpers/checkIfEmpty.js";
import { __dirname } from "../../index.js";
import { Book } from "../../models/Book.js"



export const addBookController = (req, res) => {
   const book = req.body;  
   const isCommentAllowed = book.allowComments ? true : false;  
   console.log("dir)", __dirname);
   let fileName = "";
   
   if(!checkIfEmpty(req.fileName)){
      let file = req.files.uploadedFile; 
      fileName = file.name;
      const uploadDir = `${__dirname}/public/uploads/`;
      const filePath = `${uploadDir}${fileName}`;

      file.mv(filePath, err => {
         if(err) throw new Error(err);
      })
   }

   const nextBook = new Book({
      title: book.title,
      description: book.description,
      status: book.status,  
      comments: book.comments,
      isCommentAllowed,
      category: book.category,
      file: `/uploads/${fileName}`
   });

   nextBook.save().then(book => {
      req.flash("successMessage", "books added succesfully");
      res.redirect("/admin/books")
   }) 
}
