const ApiError = require('./ApiError');

const invalidCsrfToken = (req, res, next) => {
   
   if (!req.cookies._csrf) return  next(ApiError.internal({msg: "not authenticated"}, 403));

   return next() ;
}  

module.exports = invalidCsrfToken;