import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
    const [show,setShow]=useState(false);
    const {isAuthenticated,setIsAuthenticated}=useContext(Context)
    const navigate=useNavigate()
    const handleLogout=async()=>{
       
            await axios.get('http://localhost:4000/api/v1/user/patient/logout',{withCredentials:true})
            .then((res)=>{
                toast.success('Logged Out Successfully')
                setIsAuthenticated(false)
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })
    }
    const handleLogin=async()=>{
        navigate('/login')
    }
  return (
    <nav className='container'>
        <div className="logo">
        {""}
        <img src="/hsp.png" alt="logo" className="logo-img" />
        </div>
        <div className={show?"navLinks showmenu":"navLinks"}>
        <div className="links">
            <Link to="/">HOME</Link>
            <Link  to="/appointment">APPOINTMENT</Link>
            <Link  to="/about">ABOUT US</Link>
        </div>
        {isAuthenticated? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>):(<button className='logoutBtn btn' onClick={handleLogin}>LOGIN</button>)}
        </div>
        <div className='hamburger' onClick={()=>setShow(!show)}>
            <GiHamburgerMenu/>
        </div>
    </nav>
  )
}

export default Navbar