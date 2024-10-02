import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'flowbite';
import Home from './home/Home.jsx';

// Patients
import Register from './home/Register.jsx';
import RedirectHelper from './patients/RedirectHelper.jsx'; 
import Dashboard from './patients/Dashboard.jsx';

// Doctors
import Doctor from './doctors/Doctor.jsx';
import DoctorForm from './doctors/components/DoctorForm.jsx';

// Services
import Services from './services/Services.jsx';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/patient" element={<RedirectHelper />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/doctors/doctorForm" element={<DoctorForm />} />
                <Route path="/services" element={<Services />} />
                {/* Consider adding a dashboard for services if needed */}
                {/* <Route path="/services/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
