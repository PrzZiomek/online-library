import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";
import { Comment } from "../../models/Comment.js";

export const sendCommitController = async (req, res) => { 
   try{
      const book = await Book.findById(req.body.id).catch(err => next(ApiError.internal({msg: "error when looking for user", err})));;
      
      const newComment = new Comment({
         user: req.user?.id,
         body: req.body.commentBody
      });

      const bookSaved = await book.save().catch(err => next(ApiError.internal({msg: "error when saving book", err})));;
      const commentSaved = await newComment.save().catch(err => next(ApiError.internal({msg: "error when saving comment", err})));;

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