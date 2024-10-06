import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddNewAdmin = () => {

  const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const [firstName,setFirstName]=useState("");  
  const [lastName,setLastName]=useState("");  
  const [email,setEmail]=useState("");  
  const [phone,setPhone]=useState("");  
  const [nic,setNic]=useState("");  
  const [dob,setDob]=useState("");  
  const [gender,setGender]=useState("");  
  const [password,setPassword]=useState("");  

  const navigate=useNavigate();

  const handleAdminRegister=async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:4000/api/v1/user/admin/register',{firstName,lastName,email,phone,nic,dob,password,gender},{withCredentials:true,headers:{'Content-Type':'application/json'}});
      toast.success(response.data.message);
      navigate('/');
    }catch(err){
      toast.error(err.response.data.message);
    }
      }
    
    if(!isAuthenticated){
      return <Navigate to={'/login'}/>
    }

  return (
    <>
    <section className='page'>
    <div className='container form-component add-admin-form'>
      <img src="/hsp.png" alt="logo" className='logo' />
      <h1 className='form-title'>ADD NEW ADMIN</h1>
          <form onSubmit={handleAdminRegister}   >
        <div>
      <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
      <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div>
      <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
        <div>
      <input type="number" placeholder='NIC' value={nic} onChange={(e)=>setNic(e.target.value)} />
      <input type="date" placeholder="Date Of Birth" value={dob} onChange={(e)=>setDob(e.target.value)} />
        </div>
        <div>
        <select value={gender} onChange={(e)=>setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>

      </select>
      <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div style={{gap:'10px',justifyContent:'flex-end',flexDirection:'row'}}>
          <p style={{marginBottom:0}}>Already Registered?</p>
          <Link to='/login' style={{textDecoration:"none", alignItems:"center"
          }}>Login Now</Link>
        </div>
        <div style={{justifyContent:'center',alignItems:'center'}}>
          <button type='submit'>Register</button>
        </div>

      </form>
    </div>
    </section>
    </>
  )
}

export default AddNewAdmin