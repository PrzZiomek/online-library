const ApiError = require('./ApiError');

 const apiErrorHandler = (error, req, res, next) => { 
   let message = "something went wrong"; 
   let code = 500;

   if(error instanceof ApiError){
     message = error.message; 
     code = error.code;
   };

   return res.status().render('user/error', {
      layout: 'user/error',
      message,
      code
   });
}

module.exports = apiErrorHandler;
