import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import {Message} from '../models/messageSchema.js';
import ErrorHandler from "../middlewares/errorMiddleWare.js"
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const {firstName,lastName,email,phone,message}=req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please fill all fields",400))
    };
    await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({success:true,message:"Message Sent Successfully",message})
})

export const getMessages = catchAsyncErrors(async (req, res, next) => {
    const messages=await Message.find();
    res.status(200).json(
      {  success: true,
        messages}
    )
})