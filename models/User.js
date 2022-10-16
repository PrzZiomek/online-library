import { Schema, model } from "mongoose";


const UserSchema = new Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   login: {
      type: String,
      required: true,
   },
 
});

export const User = model("User", UserSchema);
