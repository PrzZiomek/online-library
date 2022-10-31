import { Book } from "../../models/Book.js";
import { Comment } from "../../models/Comment.js";

export const sendCommitController = async (req, res) => { console.log({u: req.user, b: req.body});
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



 
 
 
 
 
 
 
 /*  const id = req.params.id;
   const bookRes = await Book.findById(id);

   if(!bookRes){
      res.status(404).json({ message: "no bookRes found" })
   }

   const book = ({
      title: bookRes.title,
      description: bookRes.description,
      id: bookRes._id,
      tags: bookRes.tags,
      status: bookRes.status, 
      category: {
         title: bookRes.category?.title
      }
   })

   res.render("singleBook", { 
      layout: "singleBook",
      book
   })

   */
}