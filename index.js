import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import flash from 'connect-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import fileUpload from 'express-fileupload';

import { routes } from "./routes/main.js";
import { selectOption } from "./helpers/selectOption.js";
import { globals } from "./vars.js";


const port = 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/** compilation directory setup */
const publicDir = express.static(path.join(__dirname, "public"));
app.use(publicDir); 

app.use(methodOverride("newMethod"));

/** requests parser configuration */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/** mongoDB connection */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).catch(err => console.log("mongoose:", err));
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

/** file upload middleware */
app.use(fileUpload());

app.use(express.static('public'));


/** session configuration */
app.use(session({
    secret: "secretkey",
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
app.use(globals)

/** Routes */

app.use("/", routes);

app.listen(port, () => console.log(`App listening to port ${port}`));