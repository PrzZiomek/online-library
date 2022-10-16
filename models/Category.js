
import { Schema, model } from "mongoose";


const CategorySchema = new Schema({
   title: {
      type: String,
      required: true
   }
});

export const Category = model("Category", CategorySchema);
