import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;
    if ([firstName, lastName, email, phone, password, gender, dob, nic, role].includes(undefined)) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }
    user = new User({ firstName, lastName, email, phone, password, gender, dob, nic, role });
    await user.save();
    generateToken(user,"Patient Registered Successfully",200,res);

});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email,password,confirmPassword,role}=req.body;
    if([email,password,confirmPassword,role].includes(undefined)){
        return next(new ErrorHandler("Please fill all the fields",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    if(role!==user.role){
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    generateToken(user,"Login Successful",200,res);
})

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    console.log('hi')
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;
    if ([firstName, lastName, email, phone, password, gender, dob, nic].includes(undefined)) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email  already exists`, 400));
    }
    const admin = new User({ firstName, lastName, email, phone, password, gender, dob, nic, role:"Admin" });
    await admin.save();
    res.status(200).json({
        success: true,
        message: "Admin Registered Successfully",
        admin
    })
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors
    })
});
export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })
});

const handleLogout=(res,tokenType)=>{
    res.status(200).clearCookie(tokenType).json({
        success:true,
        message:`Logged out successfully`
    })
}

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
   handleLogout(res,"adminToken")
}) 
export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
  handleLogout(res,"patientToken")
}) 

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doctor avatar required",400));
    }
    const {docAvatar}=req.files;
    const allowedFormats=["image/png","image/jpg","image/jpeg","image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format not supported",400));
    }
    const {firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment}=req.body;
    if([firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment].includes(undefined)){
        return next(new ErrorHandler("Please fill all the fields",400));
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Doctor with this email already exists",400));
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:",cloudinaryResponse.error|| "Unknown Error");
    }
    const user=new User({firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment,role:"Doctor",docAvatar:{public_id:cloudinaryResponse.public_id,url:cloudinaryResponse.secure_url}});
    await user.save();
    res.status(200).json({
        success:true,
        message:"Doctor Registered Successfully",
        user
    })
})
