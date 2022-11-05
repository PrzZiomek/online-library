import { Book } from "../../models/Book.js";

export const getBookController = (req, res) => {

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
            }
         }))
         
         res.render("admin/books-list", {
            layout: 'admin/books-list',
            books
         });
      })


}
