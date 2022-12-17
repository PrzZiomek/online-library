const {Schema, model} = require('mongoose');


const CategorySchema = new Schema({
   title: {
      type: String,
      required: true
   }
});

const Category = model("Category", CategorySchema);

module.exports = Category;