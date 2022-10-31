
import { Schema, model } from "mongoose";
import { boolean } from "webidl-conversions";

const CommentSchema = new Schema({
   body: {
      type: String,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   date: {
      type: Date,
      default: Date.now()
   },
   isApproved: {
      type: Boolean,
      default: false
   }
});

export const Comment = model("Comment", CommentSchema);
