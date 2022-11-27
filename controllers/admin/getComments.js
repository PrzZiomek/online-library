import { ApiError } from "../../models/ApiError.js";
import { Comment } from "../../models/Comment.js";


export const getCommentsController = (req, res, next) => {
  try{
    Comment
        .find()
        .populate('user')
        .then(comments => { console.log("comments", comments);
            res.render('admin/comments/index', {
              layout: "admin/comments/index",
              comments
          });
        })
    }
    catch(err){
      next(ApiError.internal({msg: "category not found", err}))
    }
}