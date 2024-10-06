import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Messages = () => {
  const [messages,setMessages]=useState([]);
  const {isAuthenticated, setIsAuthenticated }=useContext(Context)

  useEffect(() => {
    (async()=>{
      try{
        const response=await axios.get('http://localhost:4000/api/v1/message/getall',{withCredentials:true});
        setMessages(response.data.messages);

      }catch(err){
        console.log("ERROR OCCURED WHILE FETCHING MESSAGES:",err);
      }
    })();
  },[])
  if(!isAuthenticated){
    return <Navigate to='/login'/>
  }
  return (
    <section className='page messages'>
      <h1>MESSAGES</h1>
      <div className='banner'>
      {
        messages && messages.length >0 ?(messages.map((e,i )=>{
          return (
            <div className='card' key={i}>
              <div className='details'>
                <p>First Name: <span>{e.firstName}</span></p>
                <p>Last Name: <span>{e.lastName}</span></p>
                <p>Email: <span>{e.email}</span></p>
                <p>Phone: <span>{e.phone}</span></p>
                <p>Message: <span>{e.message}</span></p>

              </div>

            </div>
          )
        })):(<h1>No Messages</h1>)

      }
      </div>

    </section>
  )
}

export default Messages