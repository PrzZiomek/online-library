import winston, { createLogger, transports, format} from "winston";


export const logger = createLogger({

   transports: [
     //new transports.File({ filename: 'error.log', level: 'error' }),
     //new transports.File({ filename: 'combined.log' }),
     new transports.Console({
         level: "error",
         format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
            format.colorize()
         )
     }),
     new transports.File({
      filename: "error.log",
      level: "error",
      format: format.combine(
         format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), 
         format.colorize()
      )
      }),
   ],
 });