import { User } from "../models/userSchema.js";
import { ObjectId } from 'mongodb';
import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleWare.js";
import jwt from "jsonwebtoken"


export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    
    // Check if token exists
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Check if decoding was successful
    if (!decoded) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }

    // Convert decoded.id to ObjectId and find the user
    req.user = await User.findOne({ _id: new ObjectId(decoded.id) });
    
    // Check if the user is an admin
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource`, 403));
    }
    
    // If everything is fine, proceed to the next middleware
    next();
});

export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Login first to access this resource",401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decoded){
        return next(new ErrorHandler("Login first to access this resource",401));
    }
    req.user=await User.findOne({ _id: new ObjectId(decoded.id) });
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource`,403));
    }
    next();
})