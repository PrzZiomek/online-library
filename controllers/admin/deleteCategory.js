 import { Category } from "../../models/Category.js";

export const deleteCategoryController = (req, res) => {
   Category.findByIdAndDelete(req.params.id)
      .then(deleted => req.flash("successMessage", `category ${deleted} has been deleted` ));
    res.redirect("/admin/categories");
}
