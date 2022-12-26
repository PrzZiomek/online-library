import winston, { createLogger, transports, format} from "winston";

const customFormat = format.printf(({ level, message, stack, timestamp }) => {
   return `${timestamp} ${level}: ${message}: ${stack}:`;
 });

export const logger = createLogger({
   format: format.combine(
      format.colorize(),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),     
      format.prettyPrint(),
      format.errors({stack: true})     ,
      customFormat
   ),
   transports: [
     new transports.Console({
         level: "error",
     }),
     new transports.File({
      filename: "error.log",
      level: "error",
      }),
   ],
 });