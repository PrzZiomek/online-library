const ApiError = require('./ApiError');

const invalidCsrfToken = (err, req, res, next) => {
   
   if (err.code !== 'EBADCSRFTOKEN') return  next(ApiError.internal({msg: "no authenticated", err}, 403))
}  

module.exports = invalidCsrfToken;