import express from 'express';
import { createAppointment, deleteAppointment, getAllAppointments, updateAppointmentStatus } from '../controller/appointmentController.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';

const router=express.Router();

router.post('/post',isPatientAuthenticated,createAppointment)
router.get('/getall',isAdminAuthenticated,getAllAppointments)
router.put('/update/:id',isAdminAuthenticated,updateAppointmentStatus)
router.delete('/delete/:id',isAdminAuthenticated,deleteAppointment)

export default router;