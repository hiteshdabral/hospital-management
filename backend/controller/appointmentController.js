import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleWare.js"
import { Appointment } from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";


export const createAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,dob,gender,nic,appointment_date,department,doctor_firstName,doctor_lastName,hasVisited,address}=req.body;
    if([firstName,lastName,email,phone,dob,gender,nic,appointment_date,department,doctor_firstName,doctor_lastName,address].includes(undefined)){
        return next(new ErrorHandler("Please fill all the fields",400));
    }
    const isConflict=await User.find({firstName:doctor_firstName,lastName:doctor_lastName,doctorDepartment:department,role:"Doctor"});
    if(isConflict.length===0){
        return next(new ErrorHandler("Doctor not found",404));
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Multiple Doctors Found With Same Details! Please Contact Through Email or Phone",400));
    }
    const doctorId=isConflict[0]._id;
    const patientId=req.user._id;
    const appointment=new Appointment({
        firstName,lastName,email,phone,dob,gender,nic,appointment_date,department,doctor:{firstName:doctor_firstName,lastName:doctor_lastName},hasVisited,address,patientId,doctorId 
    })
    await appointment.save();
    console.log(appointment)
    res.status(201).json({
        success:true,
        message:"Appointment Created Successfully",
        appointment
    })
})

export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments
    })
})

export const updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404));
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    
    await appointment.save();
    res.status(200).json({
        success:true,
        message:"Appointment Updated Successfully",
        appointment
    })

})

export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {id} =req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found",404));
    }
    appointment=await Appointment.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Appointment Deleted Successfully",
        appointment
})
})