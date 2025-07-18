const { string, required } = require("joi");
const mongoose=require("mongoose");
const Joi=require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");


const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
}

const User=mongoose.model("user",userSchema);

const validate=(data)=>{
    const schema=Joi.object({
        firstName:Joi.string().required().label("First Name"),
        lastName:Joi.string().required().label("Last Name"),
        email:Joi.string().required().label("Email"),
        password:passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
}

module.exports={User,validate}