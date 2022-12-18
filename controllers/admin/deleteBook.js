import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js"

export const deleteBookController = (req, res, next) => {

   Book.findByIdAndDelete(req.params.id)
      .then(deleted => {
         req.flash("successMessage", `book ${deleted} has been deleted`);
         res.redirect("/admin/books-list");
      })
      .catch(err => next(ApiError.internal({msg: "error when deleting book", err})));
}
