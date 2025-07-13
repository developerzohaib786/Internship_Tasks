const { string, required } = require("joi");
const mongoose=require("mongoose");
const Joi=require("joi");


const employeeSchema=new mongoose.Schema({
    Name:{type:String,required:true},
    JoiningData:{type:Date,required:true},
    profileImage:{type:String,required:false, default:'localhost:5173/public/avatar.jpeg'},
    email:{  type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']},
    Salary:{type:Number,required:true},
}); 



const Employee=mongoose.model("employee",employeeSchema);


const validate = (data) => {
  const schema = Joi.object({
    Name: Joi.string().required().label("Name"),
    JoiningData: Joi.date().required().label("Joining Date"),
    profileImage: Joi.any().optional().label("Profile Image"),
    email: Joi.string().email().required().label("Email"),
    Salary: Joi.number().min(0).required().label("Salary"),
  });

  return schema.validate(data);
};

module.exports={Employee,validate}