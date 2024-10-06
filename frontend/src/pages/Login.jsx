import  { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const navigate=useNavigate();

  const handleLogin=async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:4000/api/v1/user/login',{email,password,confirmPassword,role:"Patient"},{withCredentials:true,headers:{'Content-Type':'application/json'}});
    toast.success(response.data.message);
    setIsAuthenticated(true)
  navigate('/');

  }catch(err){
    toast.error(err.response.data.message);
    }
  }

  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }
  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please login to continue</p>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
        <div style={{gap:'10px',justifyContent:'flex-end',flexDirection:'row'}}>
          <p style={{marginBottom:0}}>Not Registered?</p>
          <Link to='/register' style={{textDecoration:"none", alignItems:"center"
          }}>Register Now</Link>
        </div>
        <div style={{justifyContent:'center',alignItems:'center'}}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login