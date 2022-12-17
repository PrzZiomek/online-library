const sinon = require('sinon');
const mongoose = require('mongoose');

const loginPostController = require('./copiedTestedMethods/loginPost');
const User = require('./copiedTestedMethods/User');
const Book = require('./copiedTestedMethods/Book');
const Category = require('./copiedTestedMethods/Category');

const testEmail = "test@wp.pl";


describe("test database", () => {

   beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_TEST).catch(err => console.log("mongo connection error"))
    });


   describe("add new user", () => {

      beforeAll(async () => {
        const user = new User({
            firstName: "test-name",
            lastName: "test-surname",
            email: testEmail,
            password: "123",
         });

        await user.save();
      });

      it("shall email match and new user found", async () => {    

            const userFound = await User.findOne({ email: testEmail }).catch(err => console.log("error when looking for a user:", err));
            expect(userFound).toMatchObject({ email: testEmail });
         });

      it("shall not found the user because the email not matching", async () => {   

         const userFound = await User.findOne({ email: "" }).catch(err => console.log("error when looking for a user:", err));;
         expect(userFound).toBeNull();
      });

      afterAll( async () =>{
         const user = await User.findOne({ email: testEmail }).catch(err => console.log("error when looking for a user:", err));; 
         await User.findByIdAndDelete(user._id)
      });
   });

  
   describe("add new book", () => {

      const book = new Book({
         title: "test book",
         description: "description",
         isCommentAllowed: false,
         imageUrl: "/uploads/"
       }); 

      it("shall match added user to one returned after saving in db ", async () => {

         const newBook = await book.save().catch(err => console.log("error when adding a user:", err));
         expect(newBook).toMatchObject(book);
      });

      it("shall thrown an error when trying to find Book with no existing id", async () => {

        const bookError = async () => await Book.findById("");
        expect(bookError).rejects.toThrowError();
      });

      it("shall thrown an error when required field title was not provided when adding new Book", async () => {
         const book = new Book({
            description: "description",
            isCommentAllowed: false,
            imageUrl: "/uploads/"
          }); 

         const bookError = async () => await book.save();
         expect(bookError).rejects.toThrowError();
       });
   })


   describe("add new Category", () => {

      it("shall match added category to one returned after saving in db ", async () => {

         const category = new Category({
            title: "categoryName"
         }); 

         const newCategory = await category.save().catch(err => console.log("error when adding category:", err));
         expect(newCategory).toMatchObject(category);
      });

      it("shall thrown an error when type of category title not matching the type required by the model ", async () => {

         const category = new Category({
            title: null
         }); 

         const categoryError = async () => await category.save();
         expect(categoryError).rejects.toThrowError();
      });

   })


   afterAll( async () =>{
      mongoose.disconnect()
   });

});




