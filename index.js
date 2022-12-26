import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import flash from 'connect-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import multer from 'multer';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import winston from 'winston';
 
import { routes } from "./routes/main.js";
import { selectOption } from "./helpers/selectOption.js";
import { globals } from "./vars.js";
import { invalidCsrfToken } from "./middlewares/invalidCsrfToken.js";
import { apiErrorHandler } from "./middlewares/apiErrorHandler.js";
import { logger } from "./logger/logger.js";


const port = 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/** compilation directory setup */
const publicDir = express.static(path.join(__dirname, "public"));
app.use(publicDir); 

app.use(methodOverride("newMethod"));

app.use(helmet());

/** requests parser configuration */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** headers configuration */
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

/** files uploading configuration */
const fileFilter = (req, file, cb) => {
    const mimeType = file.mimetype;
    if(mimeType === "image/png" || mimeType === "image/jpg" || mimeType === "image/jpeg" || mimeType === "image/svg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/uploads/`)
    },
    filename:  (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
    },
});

app.use(multer({storage: fileStorage, fileFilter}).single("image"));

/** mongoDB connection */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).catch(err =>  logger.error(err));
const db = mongoose.connection;
db.once("open",() => console.log("connected to mongoDb"))

/** views setup with use of Handlebars */
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views',
    extname: 'hbs',
    helpers: {
        select: selectOption
    }
}));

app.use(express.static('public')); 

/** session configuration */
 app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: true,
        expires: new Date() + 9999,
        maxAge: 60 * 60 * 1000
    }
}));

app.use(flash());
app.use(globals)

app.use(cookieSession({
    name: 'session',
    keys: [
      process.env.JWT_TOKEN,
    ]
  }))

app.use(cookieParser())

app.use(hpp());

/** Routes */
app.use("/", routes);

app.use(invalidCsrfToken);

app.use(apiErrorHandler);

app.listen(port, () => console.log(`App listening to port ${port}`));