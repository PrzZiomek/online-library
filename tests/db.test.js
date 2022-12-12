const sinon = require('sinon');
const mongoose = require('mongoose');

const loginPostController = require('./copiedTestedMethods/loginPost');
const User = require('./copiedTestedMethods/User');

const testEmail = "test@wp.pl";


describe("test db", () => {

   describe("connect to db, insert new user and check when succed", () => {

      beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_TEST).catch(err => console.log("mpngo connection error"))
        
        const user = new User({
            firstName: "test-name",
            lastName: "test-surname",
            email: testEmail,
            password: "123",
         });

        await user.save();
      });

      it("new user found", async () => {    
            const req = {
               body: { email: "testEmail" },
               app: {
                  locals: {}
               }
            }

            const userFound = await User.findOne({ email: testEmail });
            expect(userFound).toMatchObject({ email: testEmail });
         });

      afterAll( async () =>{
         const user = await User.findOne({ email: testEmail }); 
         await User.findByIdAndDelete(user._id)
      });
   })
  
 

   afterAll( async () =>{
      mongoose.disconnect()
   });
   

});




 