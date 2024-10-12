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
import DoctorForm from './doctors/DoctorForm.jsx';
import DoctorDashboard from './doctors/DoctorDashboard.jsx';

// Pharmacy
import PharmacyForm from './pharmacy/components/PharmacyForm.jsx';

// Services
import Services from './services/Services.jsx';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Register />} />

                {/* Patients */}
                <Route path="/patient" element={<RedirectHelper />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>

                {/* Doctors */}
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/doctorForm" element={<DoctorForm />} />
                <Route path="/doctor" element={<RedirectHelper />}>
                    <Route path="dashboard" element={<DoctorDashboard />} />
                </Route>

                {/* Pharmacy */}
                <Route path="/pharmacyForm" element={<PharmacyForm />} />

                {/* Services */}
                <Route path="/services" element={<Services />} />
            </Routes>
        </Router>
    );
}

export default App;
