import { ApiError } from "../../models/ApiError.js";
import { Comment } from "../../models/Comment.js";


export const getCommentsController = (req, res, next) => {
  try{
    const userName = req.app.locals.userName; 

    Comment
        .find()
        .populate('user')
        .then(comments => { console.log("comments", comments);
            res.render('admin/comments/index', {
              layout: "admin/comments/index",
              comments,
              name: userName,
              csrfToken: req.csrfToken()
          });
        })
    }
    catch(err){
      next(ApiError.internal({msg: "category not found", err}))
    }
}