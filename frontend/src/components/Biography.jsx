import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
        <div className='banner'>
            <img src={imageUrl} alt="About image" />
        </div>
        <div className='banner'>
            <p>Biography</p>
            <h3>Who We Are</h3>
            <p>
  Welcome to our Namma Hospital! Our platform is designed to streamline the administrative and clinical operations of hospitals. From patient registration and appointment scheduling to medical record management and billing, our system provides a comprehensive solution to enhance efficiency and improve patient care. Our user-friendly interface ensures that healthcare professionals can focus on what they do best - providing exceptional care to patients.
</p>
<p>
  Our hospital management system is equipped with advanced features such as real-time patient tracking, automated reminders for appointments, and secure access to patient records. This ensures that all patient information is up-to-date and easily accessible to authorized personnel, enhancing the overall patient experience.
</p>
<p>
  We prioritize data security and compliance with healthcare regulations. Our system employs robust encryption methods and access controls to protect sensitive patient information. Regular audits and updates ensure that our platform remains secure and compliant with the latest standards.
</p>
<p>
  Our dedicated support team is available 24/7 to assist with any technical issues or questions you may have. We provide comprehensive training and resources to help your staff get the most out of our hospital management system.
</p>
<p>
  Join the many healthcare providers who have transformed their operations with our innovative hospital management system. Contact us today to schedule a demo and see how we can help your hospital achieve greater efficiency and improved patient care.
</p>
        </div>
    </div>
  )
}

export default Biography