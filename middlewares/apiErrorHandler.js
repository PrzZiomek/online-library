import bunyan from 'buffer';
import { logger } from '../logger/logger.js';

import { ApiError } from "../models/ApiError.js";


export const apiErrorHandler = (error, req, res, next) => { 
   console.error(error.error);
   let message = "something went wrong"; 
   
   logger.error(error);

   if(error instanceof ApiError){
     message = error.message; 
   };

   res.render('user/error', {
      layout: 'user/error',
      message
   });
}