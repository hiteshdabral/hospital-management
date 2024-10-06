import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {GoCheckCircleFill} from 'react-icons/go';
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [doctors,setDoctors]=useState([]);

  const handleUpdateStatus=async (id,status)=>{
   try{
    const {data}=await axios.put(`http://localhost:4000/api/v1/appointment/update/${id}`,{status},{withCredentials:true});
    console.log(data);
    setAppointments((previousAppointments) => {
      return previousAppointments.map(e => 
          e._id === id ? { ...e, status } : e
      );
  });
    toast.success(data.message);
   }catch(err){
   toast.error(err.response.data.message);
   }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        const result=await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setAppointments(response.data.appointments);
        setDoctors(result.data.doctors);
      } catch (err) {
        setAppointments([]);
        console.log("SOME ERROR OCCURED DURING FETCHING APPOINTMENTS", err);
      }
    })();
  }, [appointments]);


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5><br/>
              </div>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {
              appointments && appointments.length > 0 ? (appointments.map(e=>{
                return (
                  <tr key={e._id}>
                    <td>{`${e.firstName} ${e.lastName}`}</td>
                    <td>{`${e.appointment_date.substring(0,16)}`}</td>
                    <td>{`${e.doctor.firstName} ${e.doctor.lastName}`}</td>
                    <td>{`${e.department}`}</td>
                    <td>
                     <select className={e.status ==='Pending' ? "value-pending" :e.status==='Rejected' ? "value-rejected":'value-accepted'} value={e.status} onChange={(event)=>handleUpdateStatus(e._id,event.target.value)}>
                      <option value="Pending" className="value-pending">Pending</option>
                      <option value="Accepted" className="value-accepted">Accepted</option>
                      <option value="Rejected" className="value-rejected">Rejected</option>
                     </select>
                    </td>
                    <td>{e.hasVisited===true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                  </tr>
                )
              })):(<h1>No Appointments Found</h1>)
            }
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
