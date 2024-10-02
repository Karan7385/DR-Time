import React from 'react';
import { Outlet } from 'react-router-dom';

const RedirectHelper = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default RedirectHelper;
