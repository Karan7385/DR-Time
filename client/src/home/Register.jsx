import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import navbarLogo from '/icons/navbarLogo.jpg';
import LoaderPage from './components/LoaderPage';

const Register = () => {
    const [loader, setLoader] = useState(true);

    const [formData, setFormData] = useState({
        fname: '',
        mname: '',
        lname: '',
        dob: '',
        gender: '',
        mobile: '',
        email: '',
        password: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        comments: '',
        policyNumber: '',
        terms: true,
        photo: null,
    });


    const [errors, setErrors] = useState({});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const validateForm = useCallback(() => {
        let tempErrors = {};

        const requiredFields = [
            'fname', 'lname', 'dob', 'gender', 'mobile',
            'email', 'password', 'street', 'city',
            'state', 'zipCode', 'emergencyContactName',
            'emergencyContactNumber'
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                tempErrors[field] = `${field} is required`;
                toast.error(`${field} is required`);
            }
        });

        if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
            tempErrors.mobile = 'Mobile Number must be 10 digits';
            toast.error('Mobile Number must be 10 digits');
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
            toast.error('Email is invalid');
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }, [formData]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (validateForm()) {
            const formDataToSubmit = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSubmit.append(key, value);
            });

            try {
                const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setErrors({});
                Cookies.set('token', response.data.token, { expires: 1, secure: true });
                sessionStorage.setItem('userData', JSON.stringify(response.data.userData));
                navigate('/patient/dashboard', { replace: true });

            } catch (error) {
                setErrors({});
                setLoader(false);
                console.log(error);
                setErrors(error.response.data.message);
                toast.error(error.response.data.message);
            }
        } else {
            setLoader(false);
        }
    };

    const notify = () => {
        Object.values(errors).forEach((error) => {
            toast.error(error);
        });
    };

    useEffect(() => {
        let isMounted = true;

        const fetchCitiesAndStates = async () => {
            try {
                const response = await fetch('http://localhost:5173/src/assets/javascript/places.json');
                const data = await response.json();

                if (isMounted) {
                    const indiaData = data.find(place => place.name === "India");

                    if (indiaData) {
                        const stateList = indiaData.states.map(state => state.name).sort();
                        const cityList = indiaData.states.map(stat => stat.cities.map(cit => cit.name)).flat().sort();

                        setStates(stateList);
                        setCities(cityList);
                        setLoader(false);
                    } else {
                        toast.error('Data not found');
                        notify();
                    }
                }
            } catch (error) {
                toast.error('Error fetching cities');
                notify();
                console.error("Error fetching cities:", error);
            }
        };

        fetchCitiesAndStates();

        return () => {
            isMounted = false;
        };

    }, []);

    return loader ? (<LoaderPage />) :
        (
            <>
                <ToastContainer />
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center mb-6 py-5 text-2xl font-semibold text-gray-900 dark:text-white"
                        >
                            <img
                                className="w-16 h-16 mr-2 rounded-lg"
                                src={navbarLogo}
                                alt="logo"
                            />
                            <strong><span className="text-green-500">DR</span>. <span className='text-blue-500'>TIME</span></strong>
                        </Link>

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an patient account
                                </h1>
                                <form onSubmit={handleRegister} encType="multipart/form-data" className="space-y-4 md:space-y-6">
                                    <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 items-center'>
                                        {/* First name */}
                                        <div>
                                            <label
                                                htmlFor="fname"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                First Name <span className='text-red-500'> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fname"
                                                id="fname"
                                                value={formData.fname}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Karan"
                                            />
                                        </div>

                                        {/* Middle name */}
                                        <div>
                                            <label
                                                htmlFor="mname"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                name="mname"
                                                id="mname"
                                                value={formData.mname}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Premsingh"
                                            />
                                        </div>

                                        {/* Last name */}
                                        <div>
                                            <label
                                                htmlFor="lname"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Last Name <span className='text-red-500'> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lname"
                                                id="lname"
                                                value={formData.lname}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Vishwakarma"
                                            />
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 items-center'>
                                        {/* DOB */}
                                        <div>
                                            <label
                                                htmlFor="dob"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Date of Birth <span className='text-red-500'> *</span>
                                            </label>
                                            <div className="relative max-w-sm">
                                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    id="datepicker-autohide"
                                                    name='dob'
                                                    type="date"
                                                    value={formData.dob}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Select date"
                                                />
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <label
                                                htmlFor="gender"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Gender <span className='text-red-500'> *</span>
                                            </label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value='' className='hidden'>Choose a Gender </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>

                                        {/* Mobile */}
                                        <div>
                                            <label
                                                htmlFor="mobile"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Mobile Number <span className='text-red-500'> *</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 19 18"
                                                    >
                                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    id="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="7385256977"
                                                    maxLength={10}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email <span className='text-red-500'> *</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="name@example.xyz"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your Password <span className='text-red-500'> *</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-4 md:gap-10 items-center'>
                                        {/* Street */}
                                        <div>
                                            <label
                                                htmlFor="street"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Street <span className='text-red-500'> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="street"
                                                id="street"
                                                value={formData.street}
                                                onChange={handleInputChange}
                                                placeholder='Street'
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>

                                        {/* city */}
                                        <div>
                                            <label
                                                htmlFor="city"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                City <span className='text-red-500'> *</span>
                                            </label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value='' className='hidden'>Choose a City</option>
                                                {cities.map((city, index) => (
                                                    <option key={index} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* state */}
                                        <div>
                                            <label
                                                htmlFor="state"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                State <span className='text-red-500'> *</span>
                                            </label>
                                            <select
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value='' className='hidden'>Choose a State </option>
                                                {states.map((state, index) => (
                                                    <option key={index} value={state}>{state}</option>
                                                ))}                                        </select>
                                        </div>

                                        {/* zipcode */}
                                        <div>
                                            <label
                                                htmlFor="zipCode"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                ZIP code <span className='text-red-500'> *</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 16 20"
                                                    >
                                                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="zipCode"
                                                    aria-describedby="helper-text-explanation"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="401303"
                                                    name='zipCode'
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10 items-center'>
                                        {/* Emergency Contact Name */}
                                        <div>
                                            <label
                                                htmlFor="emergencyContactName"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Emergency Contact Name <span className='text-red-500'> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="emergencyContactName"
                                                id="emergencyContactName"
                                                value={formData.emergencyContactName}
                                                onChange={handleInputChange}
                                                placeholder='John Doe'
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Emergency Contact Number */}
                                        <div>
                                            <label
                                                htmlFor="emergencyContactNumber"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Emergency Contact Number <span className='text-red-500'> *</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 19 18"
                                                    >
                                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="emergencyContactNumber"
                                                    id="emergencyContactNumber"
                                                    value={formData.emergencyContactNumber}
                                                    onChange={handleInputChange}
                                                    placeholder='7385256977'
                                                    maxLength={10}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Comments */}
                                        <div>
                                            <label
                                                htmlFor="comments"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Comments
                                            </label>
                                            <input
                                                type="text"
                                                name="comments"
                                                id="comments"
                                                value={formData.comments}
                                                onChange={handleInputChange}
                                                placeholder='// Comments'
                                                maxLength={100}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Policy Number */}
                                        <div>
                                            <label
                                                htmlFor="policy-number"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Policy Number <span className='text-red-500'> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="policy-numbert"
                                                name='policyNumber'
                                                value={formData.policyNumber}
                                                onChange={handleInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="852124793"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="file_input"
                                        >
                                            Upload file <span className='text-red-500'> *</span>
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="file_input"
                                            name='photo'
                                            type="file"
                                            onChange={handleFileChange}
                                        />

                                    </div>

                                    <div className='grid grid-cols-1 md:grid-rows-3  items-center'>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="terms"
                                                    name='terms'
                                                    value={formData.terms}
                                                    onChange={handleInputChange}
                                                    type="checkbox"
                                                    required
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                                />
                                                <label
                                                    className="px-2 font-light text-gray-500 dark:text-gray-300"
                                                >
                                                    I accept the{" "}
                                                </label>
                                            </div>
                                            <div className="text-sm">
                                                <button
                                                    type="button"
                                                    onClick={openModal}
                                                    data-modal-target="static-modal" data-modal-toggle="static-modal"
                                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                >
                                                    Terms and Conditions <span className='text-red-500'> *</span>
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Create an account
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account?{" "}
                                            <Link
                                                to="/"
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                Login here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {isModalOpen && (
                    <div
                        id="static-modal"
                        data-modal-backdrop="static"
                        tabIndex={-1}
                        aria-hidden={!isModalOpen}
                        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Terms & Conditions
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={closeModal}
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
                                <div className="p-4 md:p-5 space-y-4">
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        With less than a month to go before the European Union enacts new
                                        consumer privacy laws for its citizens, companies around the world are
                                        updating their terms of service agreements to comply.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        The European Union’s General Data Protection Regulation (G.D.P.R.)
                                        goes into effect on May 25 and is meant to ensure a common set of data
                                        rights in the European Union. It requires organizations to notify
                                        users as soon as possible of high-risk data breaches that could
                                        personally affect them.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </>
        );
}

export default Register;
