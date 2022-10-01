const express = require('express');
const app = express();
const mongoose = require("mongoose");
const handlebars = require('express-handlebars');
const path = require("path");
 
const port = 5000;

/** compilation directory setup */
const publicDir = express.static(path.join(__dirname, "public"));
app.use(publicDir);

/** requests parser configuration */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/** mongoDB connection */
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).catch(err => console.log("mongoose:", err));
const db = mongoose.connection;
db.once("open",() => console.log("connected to mongoDb"))

/** views setup with use of Handlebars */
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/default',
    extname: 'hbs',
  //  defaultLayout: 'planB',
  //  partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {layout: 'index'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));