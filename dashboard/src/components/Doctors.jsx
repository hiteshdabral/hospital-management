import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(response.data.doctors);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    })();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor, index) => {
              return (
                <div className="card" key={index}>
                  <img
                    src={doctor.docAvatar && doctor.docAvatar.url}
                    alt="DocAvatar"
                  />
                  <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email:<span>{doctor.email}</span>
                    </p>
                    <p>
                      Phone:<span>{doctor.phone}</span>
                    </p>
                    <p>
                      DOB:<span>{doctor.dob?.substring(0,10)}</span>
                    </p>
                    <p>
                      Department:<span>{doctor.doctorDepartment}</span>
                    </p>
                    <p>
                      Nic:<span>{doctor.nic}</span>
                    </p>
                    <p>
                      Gender:<span>{doctor.gender}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No Doctors Found</h2>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
