import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = Cookies.get('sessionId');
        
        if (!sessionId) {
            navigate('/', { state: { errorMessage: "Please login to access your portal"}, replace: true });
        }
    }, [navigate]);

    return (
        <div>
            Dashboard
        </div>
    );
}

export default Dashboard;
