const request = require("supertest"); 
const { expectCt } = require("helmet");
const sinon = require('sinon');

const apiErrorHandler = require("./copiedTestedMethods/apiErrorHandler");
const invalidCsrfToken = require("./copiedTestedMethods/invalidCsrfToken");
const isAuth = require("./copiedTestedMethods/isAuth");
const ApiError = require('./copiedTestedMethods/ApiError');

const testEmail = "test@wp.pl";
const testUser = {
   __v: 0,
   _id: "638396c05dd2a5145a6e03aa",
   firstName: "test-name",
   lastName: "test-surname",
   email: testEmail,
   password: "123"
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


describe("test middlewares", () => {

   const res = { 
      status: function(n){ return this },
      render: (path, pageParams) => ({ 
         ...pageParams,
         layout: pageParams.layout,     
      })
   };
   
   describe("test isAuth", () => {

      it("shall return response `user/login` layout with error message or run next if user is authorized", () => {
         const req = {
            app: { 
               locals: { userAuthorized: null }
             }
         };
         const expectedRes = {
            layout: 'user/login',
            errors: [{ msg: "first log in please" }]
         };
         const mockedNext = jest.fn();
     
         expect(isAuth(req, res, mockedNext)).toEqual(expectedRes);
      });

      it("shall return next if user is authorized", () => {
         const req = {
            app: { 
               locals: { userAuthorized: true }
             }
         };
         const expectedRes = () => "return next";
   
         expect(isAuth(req, res, expectedRes)).toEqual("return next");
      })
   })
   

   describe("test apiErrorHandler", () => {
   
      it("shall return response with status 400 and `user/error` layout with provided error code and message", () => {
         const expectedRes = {
            layout: 'user/error',
            message: "test message",
            code: 400
         };
         const errorObj = ApiError.badRequest({msg: "test message"});

         expect(apiErrorHandler(errorObj, null, res, null)).toEqual(expectedRes)
      });

      it("shall return response with status 500 and `user/error` layout with default", () => {
         const expectedRes = {
            layout: 'user/error',
            message: "something went wrong",
            code: 500
         };
         const errorObj = {  message: "some error", code: 404 };

         expect(apiErrorHandler(errorObj, null, res, null)).toEqual(expectedRes)
      })
   });
   
   
   describe.only("test invalidCsrfToken", () => {
   
      it("shall return response with status 404 and `user/login` layout with error message", () => {
         const req = {
            app: { 
               locals: { userAuthorized: null }
             }
         };
         const res = {};
         const errorObj = {
            code: 500,
            message: 'book not found',
            error: "internal error"
         };
   
         expect(invalidCsrfToken(err, null, null, next))
      })
   })
   
   
})



/*
describe("Book model", () => {

   beforeEach(() => {
   //   jest.setTimeout(20000);
   });

   describe("get book route", () => {

      it("book doesnt exist, shall return 404", async () => {
   
      })
   })
  
 

   afterAll( async () =>{
     /// db.close()
   });
   

});
*/

//    expect(ObjectID.isValid(body)).toBeTruthy();
