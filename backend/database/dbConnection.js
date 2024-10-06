import mongoose from "mongoose";

export const dbConnection =  () => {
     mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT-SYSTEM",
     }).then(()=>{   
         console.log("connected to db");
     }).catch((error)=>{
        console.log('error connecting to db');
         console.log(error);
     });
  
};
