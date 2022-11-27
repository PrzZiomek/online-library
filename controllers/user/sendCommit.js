import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";
import { Comment } from "../../models/Comment.js";

export const sendCommitController = async (req, res) => { //console.log({u: req.user, b: req.body});
   try{
   // to do when authorization will be implemented
   /*  if(!req.user){
         req.flash("errorMessage", "first sign in if you want to make comments");
         return;
      }; 
   */
   // using book title instad user id
      const book = await Book.findById(req.body.id);
      
      const newComment = new Comment({
         user: req.user?.id,
         body: req.body.commentBody
      });

      const bookSaved = await book.save();
      const commentSaved = await newComment.save();

      if(!bookSaved || !commentSaved){
         console.log("submiting Comment failed!");
         return;
      };

      book.comments.push(newComment);

      req.flash("successMessage", "your commit added succesfully");
      res.redirect(`/book/${book._id}`)
   }
   catch(err){
      next(ApiError.internal({msg: "error wen sending comment", err}))
   }
}