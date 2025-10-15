const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    firstname:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastname:{
        type:String,
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true
    },
    age:{
        type:Number,
        min:5,
        max:80
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:true

    },
    problemsolves:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem'
        }],
        unique:true
    }
},{timestamps:true})
const user=mongoose.model("user",userSchema);
module.exports=user;