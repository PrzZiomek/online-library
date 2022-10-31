import { Comment } from "../../models/Comment.js";


export const getCommentsController = (req, res) => {
   Comment.find()
       .populate('user')
       .then(comments => { console.log("comments", comments);
           res.render('admin/comments/index', {
            layout: "admin/comments/index",
            comments
         });
       })
}