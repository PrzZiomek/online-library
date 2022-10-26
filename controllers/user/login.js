import { nextTick } from "async";

export const loginController = (_, res) => { 
   res.render("login", {layout: 'login'});
}
