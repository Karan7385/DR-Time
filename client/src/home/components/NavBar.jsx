import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { HiEnvelope } from "react-icons/hi2";

import navbarLogo from '/icons/navbarLogo.jpg';

const LoaderPage = React.lazy(() => import('./LoaderPage'));

const validateForm = (formData) => {
    let errors = {};
    const requiredFields = ['email', 'password'];

    requiredFields.forEach((field) => {
        if (!formData[field]) {
            errors[field] = `${field} is required`;
            toast.error(`${field} is required`);
        }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
        toast.error('Email is invalid');
    }

    return errors;
};

const validateContactForm = (formData) => {
    let errors = {};
    const requiredFields = ['email', 'subject', 'message'];

    requiredFields.forEach((field) => {
        if (!formData[field]) {
            errors[field] = `${field} is required`;
            toast.error(`${field} is required`);
        }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
        toast.error('Email is invalid');
    }

    return errors;
};

const Navbar = React.memo((props) => {
    const [loader, setLoader] = useState(false);
    const [modalFlag, setModalFlag] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [contactFormData, setContactFormData] = useState({ email: '', subject: '', message: '' });
    const [error, setError] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setError(validateForm({ ...formData, [name]: value })); // Validate on change
    };

    const handleChangeContact = (e) => {
        const { name, value } = e.target;
        setContactFormData((prevData) => ({ ...prevData, [name]: value }));
        setError(validateContactForm({ ...contactFormData, [name]: value }));
    };

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        setLoader(true);

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length) {
            setError(validationErrors);
            setLoader(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', formData);
            Cookies.set('sessionId', response.data.token, { expires: 1 });

            const routes = {
                patient: "/patient/dashboard",
                pathologist: "/pathologist/dashboard",
                doctor: "/doctor/dashboard"
            };

            const userType = response.data.user?.userType;

            if (userType && routes[userType]) {
                navigate(routes[userType], { state: { user: response.data.user }, replace: true });
            } else {
                throw new Error("Unexpected user type.");
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
            toast.error(errorMessage);
        } finally {
            setLoader(false);
        }
    }, [formData, navigate]);

    const handleContact = useCallback(async (e) => {
        e.preventDefault();
        setLoader(true);

        const validationErrors = validateContactForm(contactFormData);
        if (Object.keys(validationErrors).length) {
            setError(validationErrors);
            setLoader(false);
            return;
        }

        try {
            // Adjust the API endpoint for your contact form
            await axios.post('http://localhost:8080/api/contact', contactFormData);
            toast.success("Your message has been sent successfully!");
            setContactFormData({ email: '', subject: '', message: '' }); // Reset form
            handleClose(); // Close the drawer
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
            toast.error(errorMessage);
        } finally {
            setLoader(false);
        }
    }, [contactFormData]);

    return loader ? (
        <React.Suspense fallback={<div>Loading...</div>}>
            <LoaderPage />
        </React.Suspense>
    ) : (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="grid grid-cols-1 md:flex justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={navbarLogo} className="w-16 h-16 rounded-full" alt="DR. TIME Logo" />
                        <span className="self-center text-2xl md:text-4xl font-semibold montserrat whitespace-nowrap dark:text-white">
                            <strong><span className="text-green-500">DR</span>. <span className='text-blue-500'>TIME</span></strong>
                        </span>
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:flex md:gap-5 md:justify-between md:items-center">
                        <div className="flex flex-col items-center justify-center">
                            <blockquote className="text-sm font-semibold text-center">
                                “If you face issues,
                                <span className="font-bold text-green-500"> Get HELP </span>
                                anytime!”
                            </blockquote>
                            <a href="tel:5541251234" className="text-sm text-gray-500 dark:text-white hover:underline">
                                (+91 -) 738 525 6977
                            </a>
                        </div>
                        <div className="flex flex-wrap justify-center gap-10">
                            <button onClick={() => setModalFlag(true)} className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 md:p-1 md:mb-2 md:me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                <span className="relative px-1 py-3 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Sign In
                                </span>
                            </button>
                            <Link to="signup" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Bottom Navigation Bar */}
            <nav className="bg-gray-50 shadow-lg overflow-hidden dark:bg-gray-700 md:sticky md:top-0 md:z-40">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center justify-start">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-9 justify-between w-full space-x-0 md:space-x-5 md:space-y-0 gap-5 font-medium mt-0 rtl:space-x-reverse text-sm">
                            {['/', '/doctors', '/pathologists', '/pharmacists', '/ayurvedas', '/prescriptions', '/insurances', '/services'].map((path, index) => {
                                const pages = ["home", "doctors", "pathologist", "pharmacy", "ayurvedic", "prescription", "insurance", "services"];
                                const pageNames = ["Home", "Doctors", "Pathologists", "Pharmacy", "Ayurvedic", "Analysis", "Insurance", "Services"];
                                const page = pages[index];
                                const isActive = props.page === page;

                                return (
                                    <li key={page} className="flex-grow md:flex-grow-0">
                                        <Link to={path} className={`flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-gray-900 rounded hover:bg-gray-200 dark:text-white ${isActive ? 'bg-green-200 dark:bg-green-800' : 'bg-white dark:bg-green-700'}`}>
                                            {pageNames[index]}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="flex-grow md:flex-grow-0">
                                <Button className=' text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800' onClick={() => setIsOpen(true)}>Support</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sign-In Modal */}
            {modalFlag && (
                <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black opacity-50" // This creates the backdrop
                    onClick={() => setModalFlag(false)} // Close the modal when clicking the backdrop
                />
            
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Sign in <strong><span className="text-green-500">DR</span>. <span className='text-blue-500'>TIME</span></strong>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setModalFlag(false)} // Note: Changed from `onclick` to `onClick`
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {error.email && <p className="text-red-600">{error.email}</p>}
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                defaultValue=""
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <label
                                            htmlFor="remember"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Lost Password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-green-800 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm py-2.5"
                                >
                                    Login to your account
                                </button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Not registered?{" "}
                                    <Link
                                        to="/"
                                        className="text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Create account
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            

            )}

            {/* Contact Drawer */}
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="CONTACT US" titleIcon={HiEnvelope} />
                <Drawer.Items>
                    <form onSubmit={handleContact}>
                        <div className="mb-6 mt-3">
                            <Label htmlFor="email" className="mb-2 block">
                                Your email
                            </Label>
                            <TextInput id="email" name="email" value={contactFormData.email} onChange={handleChangeContact} placeholder="name@company.com" type="email" />
                            {error.email && <p className="text-red-600">{error.email}</p>}
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="subject" className="mb-2 block">
                                Subject
                            </Label>
                            <TextInput id="subject" name="subject" value={contactFormData.subject} onChange={handleChangeContact} placeholder="Let us know how we can help you" />
                            {error.subject && <p className="text-red-600">{error.subject}</p>}
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="message" className="mb-2 block">
                                Your message
                            </Label>
                            <Textarea id="message" name="message" value={contactFormData.message} onChange={handleChangeContact} placeholder="Your message..." rows={4} />
                            {error.message && <p className="text-red-600">{error.message}</p>}
                        </div>
                        <div className="mb-6">
                            <Button type="submit" className="w-full">
                                Send message
                            </Button>
                        </div>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <a href="mailto:info@company.com" className="hover:underline">
                                karanvishwakarma7385@gmail.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <a href="tel:7385256977" className="hover:underline">
                                738-525-6977
                            </a>
                        </p>
                    </form>
                </Drawer.Items>
            </Drawer>
        </>
    );
});

export default Navbar;
