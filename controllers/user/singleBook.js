import { ApiError } from "../../models/ApiError.js";
import { Book } from "../../models/Book.js";


export const singleBookController = async (req, res, next) => {
   try{
      const id = req.params.id;
      const userName = req.app.locals; console.log(userName);
      const isUserLogged = req.app.locals.userAuthorized; 
      const bookRes = await Book.findById(id)
         .populate({
            path: "comments",  
            populate: { path: "user", model: "user" }
         })

      const book = ({
         title: bookRes.title,
         description: bookRes.description,
         id: bookRes._id,
         tags: bookRes.tags,
         status: bookRes.status, 
         category: {
            title: bookRes.category?.title
         },
         creationDate: bookRes.creationDate.toDateString(),
         image: bookRes.imageUrl
      }); 

      res.render("user/singleBook", { 
         layout: "user/singleBook",
         book,
         comments: bookRes.comments,
         isUserLogged
      })
   }
   catch(err){
      next(ApiError.badRequest({msg: "Book not found", err}, 404))
   }

}
