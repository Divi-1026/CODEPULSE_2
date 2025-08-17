const validator=require('validator')

const  validate=(data)=>{
    const mandatory=['email','password'];
    const isAllowed=mandatory.every((k)=>Object.keys(data).includes(k));
 if(!isAllowed) throw new Error("Field Misiing");
 if(!validator.isEmail(data.email)) throw new Error("Invalid Misiing");
 if(!validator.isStrongPassword(data.password)) throw new Error("Enter Strong Password");
}
module.exports=validate;