import { Book } from "../../models/Book.js";

export const editBookController = (req, res) => {
   const id = req.params.id;

   Book.findById(id).then(bookRes => {   
      const book = {
         title: bookRes.title,
         description: bookRes.description,
         id: bookRes._id,
         tags: bookRes.tags,
         status: bookRes.status,
         comments: bookRes.comments
      };

      console.log(book);

      res.render("books-edit", { layout: "books-edit", book });
   })
}
