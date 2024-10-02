import React from 'react';
import logo from '/icons/logo.jpg';

function LoaderPage() {
    return (
        <div className="relative flex h-screen items-center justify-center bg-white">
            <div className="absolute h-32 w-32 md:h-96 md:w-96 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent">
            </div>
            <img className="h-20 md:h-80 w-20 md:w-80 animate-pulse rounded-full" src={logo} alt="Logo loader" />
        </div>

    )
}

export default LoaderPage
