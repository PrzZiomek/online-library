import { Book } from "../../models/Book.js";

export const editBookController = (req, res) => {
   const id = req.params.id;
// to do for categories
   Book
      .findById(id)
      .populate("category")
      .then(bookRes => {   
         const book = {
            title: bookRes.title,
            description: bookRes.description,
            id: bookRes._id,
            tags: bookRes.tags,
            status: bookRes.status,
            comments: bookRes.comments,
            category: {
               title: bookRes.category?.title,
               id: bookRes.category?._id,
            },
            image: book.imageUrl
         };

      res.render("books-edit", { 
         layout: "books-edit",
          book, 
          categories: book.category 
      });
   })
}
