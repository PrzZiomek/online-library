import { nextTick } from "async";

export const loginController = (_, res) => { 
   res.render("user/login", {layout: 'user/login'});
}
