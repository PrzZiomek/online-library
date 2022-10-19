import { Book } from "../../models/Book.js"

export const deleteBookController = (req, res) => {
   Book.findByIdAndDelete(req.params.id)
      .then(deleted => req.flash("successMessage", `book ${deleted} has been deleted` ));
      res.redirect("/admin/books");
}
