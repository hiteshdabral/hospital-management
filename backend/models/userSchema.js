import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
const {Schema,model} = mongoose;
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new Schema({
firstName:{
    type:String,
    required:true,
    trim:true,
    minLength:[3,"First name must be at least 3 characters long"],
},
lastName:{
    type:String,
    required:true,
    trim:true,
    minLength:[3,"Last name must be at least 3 characters long"],
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate:[validator.isEmail,"Please provide a valid email"],
    validate:{
        validator:function(value){
            return emailRegex.test(value);
        },
        message:(props)=>`${props.value} is not a valid email address`
    }
},
phone:{
    type:String,
    required:true,
    unique:true,
    minLength:[10,"Phone number must contain at exact 10 digits"],
    maxLength:[10,"Phone number must contain at exact 10 digits"],
    validate:[validator.isMobilePhone,"Please provide a valid phone number"],
},
nic:{
    type:String,
    required:true,
    unique:true,
    minLength:[13,"NIC must contain at exact 13 characters"],
    maxLength:[13,"NIC must contain at exact 13 characters"],
},
dob:{
    type:Date,
    require:[true,'DOB is required'],
},
gender:{
    type:String,
    required:true,
    enum:["Male","Female"]
},
password:{
    type:String,
    required:true,
    minLength:[8,"Password must be at least 8 characters long"],
    select:false
},
role:{
    type:String,
    default:"user",
    enum:["Patient","Admin","Doctor"]
},
doctorDepartment:{
    type:String
},
docAvatar:{
    public_id:String,
    url:String
}
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
}



export const User=model("User",userSchema);
