import { Book } from "../../models/Book.js";


export const singleBookController = async (req, res) => {
   const id = req.params.id;
   const userName = req.app.locals; console.log(userName);
   const isUserLogged = req.app.locals.userAuthorized; 
   const bookRes = await Book.findById(id)
      .populate({
         path: "comments",
         populate: { path: "user", model: "user" }
      });

   if(!bookRes){
      res.status(404).json({ message: "no bookRes found" })
   }; //console.log("book res", bookRes);

   const book = ({
      title: bookRes.title,
      description: bookRes.description,
      id: bookRes._id,
      tags: bookRes.tags,
      status: bookRes.status, 
      category: {
         title: bookRes.category?.title
      },
      creationDate: bookRes.creationDate,
      image: bookRes.imageUrl
   }); 

   res.render("user/singleBook", { 
      layout: "user/singleBook",
      book,
      comments: bookRes.comments,
      isUserLogged
   })
}
