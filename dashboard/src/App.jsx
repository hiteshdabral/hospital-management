import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import AddNewDoctor from './components/AddNewDoctor'
import AddNewAdmin from './components/AddNewAdmin'
import Messages from './components/Messages'
import Doctors from './components/Doctors'
import Sidebar from './components/Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext,useEffect } from 'react'
import { Context } from './main'
import axios from 'axios'
import './App.css'

const App = () => {
  const {isAuthenticated,setIsAuthenticated,setUser}=useContext(Context)
  useEffect(() => {
    (async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/user/admin/me', { withCredentials: true });
            setIsAuthenticated(true);
            setUser(response.data.user);
        } catch (err) {
            setIsAuthenticated(false);
            setUser({});
        }
    })();
}, [isAuthenticated]);
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
        <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        {/* <Route path='/sidebar' element={<Sidebar/>}/> */}
      </Routes>
      <Sidebar/>
      <ToastContainer position='top-center'/>
    </Router>
    </>
  )
}

export default App