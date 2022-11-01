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
   },
   creationDate: {
      type: Date,
      default: Date.now()
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
   },
   comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
   }],
   imageUrl: {
      type: String,
      default: ""
   }
});

export const Book = model("Book", BookSchema);
