
export function selectOption(status, options){
   return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
}