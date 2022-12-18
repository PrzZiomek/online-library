import { ApiError } from "../../models/ApiError.js";
import { Comment } from "../../models/Comment.js";


export const getCommentsController = (req, res, next) => {
  try{
    const userName = req.app.locals.userName; 

    Comment
        .find()
        .populate('user')
        .then(comments => { 
            res.render('admin/comments/index', {
              layout: "admin/comments/index",
              comments,
              name: userName,
              csrfToken: req.csrfToken()
          });
        })
        .catch(err =>  next(ApiError.internal({msg: "comments not found", err})));
    }
    catch(err){
      next(ApiError.internal({msg: "error when getting comments", err}));
    }
}