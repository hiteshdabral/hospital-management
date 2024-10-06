import mongoose from 'mongoose';
import validator from 'validator';

const {Schema,model}=mongoose

const messageSchema = new Schema({ 
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must be at least 3 characters long"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must be at least 3 characters long"],
    },
    email:{
        type:String,
        required:true,
        validator:[validator.isEmail,"Please Provide a Valid Email"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number Must Contain Exact 10 Digits"],
        maxLength:[10,"Phone Number Must Contain Exact 10 Digits"],
    },
    message:{
        type:String,
        required:true,
    },
 });


export const Message=model("Message",messageSchema);
