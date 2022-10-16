import { Book } from "../../models/Book.js";

export const getBookController = (req, res) => {

   Book.find({}).exec((err, booksRes) => { 
      const books = booksRes.map(book => ({
         title: book.title,
         description: book.description,
         id: book._id,
         tags: book.tags,
         status: book.status
      }))

      res.render("index-books", {
         layout: 'index-books',
         books
      });
   })


}
