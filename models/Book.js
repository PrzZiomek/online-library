import { Schema, model } from "mongoose";


const BookSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   tags: [
      {
         type: String,
      }
   ],
   status: {
      type: String,
      default: "public"
   }
});

export const Book = model("Book", BookSchema);
