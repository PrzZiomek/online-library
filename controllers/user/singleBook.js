import { Book } from "../../models/Book.js";


export const singleBookController = async (req, res) => {
   const id = req.params.id;
   const bookRes = await Book.findById(id)
      .populate({
         path: "comments",
         populate: { path: "user", model: "user" }
      });

   if(!bookRes){
      res.status(404).json({ message: "no bookRes found" })
   };

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

   res.render("user/singleBook", { 
      layout: "user/singleBook",
      book,
      comments: bookRes.comments
   })
}
