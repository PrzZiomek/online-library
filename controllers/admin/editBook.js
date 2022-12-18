import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";

export const editBookController = (req, res, next) => {
   try{
      const id = req.params.id;
      const userName = req.app.locals.userName; 
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
               image: bookRes.imageUrl
            };

            res.render("admin/books-edit", { 
               layout: "admin/books-edit",
               book, 
               categories: book.category,
               name: userName,
               csrfToken: req.csrfToken()
            });
      })
      .catch(err => next(ApiError.internal({msg: "editing book failed", err})));
   }
   catch(err){
      next(ApiError.internal({msg: "error editing book", err}));
   }
}
