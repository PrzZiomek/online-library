export class ApiError {
   constructor( errObj, code) {
      this.code = code;
      this.message = errObj.msg;
      this.error = errObj.err
   }

   static badRequest({ msg, err }, code = 400){
      return new ApiError({ msg, err }, code);
   }

   static internal({ msg, err }, code = 500){
      return new ApiError({ msg, err }, code);
   }
}