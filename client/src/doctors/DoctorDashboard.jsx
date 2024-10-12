import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function DoctorDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionDoctorId = Cookies.get('sessionDoctorId');
        
        if (!sessionDoctorId) {
            navigate('/', { state: { errorMessage: "Please login to access your portal"}, replace: true });
        }
    }, [navigate]);
  return (
    <>
      Doctors dashboard
    </>
  )
}

export default DoctorDashboard
