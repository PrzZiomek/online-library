 import { ApiError } from "../../models/ApiError.js";
import { Category } from "../../models/Category.js";

export const deleteCategoryController = (req, res, next) => {
   
   Category.findByIdAndDelete(req.params.id)
      .then(deleted => {
         req.flash("successMessage", `category ${deleted} has been deleted` );
         res.redirect("/admin/categories");
      })
      .catch(err => next(ApiError.internal({msg: "error when deletin category", err})));
}
