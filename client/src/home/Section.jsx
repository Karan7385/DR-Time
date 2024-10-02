import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { specialties } from '../assets/javascript/config';
import LoaderPage from './components/LoaderPage';
import SearchBar from './SearchBar';
import DoctorCard from './components/DoctorCard';

// Flowbite import
import { Carousel } from "flowbite-react";

function Section() {
    const [formData, setFormData] = useState({ city: '', search: '' });
    const [searchDoctors, setSearchDoctors] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(true);
    const [debouncedSearchTerm] = useDebounce(formData.search, 500);

    useEffect(() => {
        const fetchCitiesAndStates = async () => {
            try {
                const response = await fetch('http://localhost:5173/src/assets/javascript/places.json');
                const data = await response.json();
                const indiaData = data.find(place => place.name === "India");

                if (indiaData) {
                    const cityList = indiaData.states.map(stat => stat.cities.map(cit => cit.name)).flat().sort();
                    setCities(cityList);
                } else {
                    setErrors(prev => [...prev, 'Data not found']);
                }
            } catch (error) {
                setErrors(prev => [...prev, 'Error fetching cities']);
            } finally {
                setLoader(false);
            }
        };

        fetchCitiesAndStates();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (debouncedSearchTerm && formData.city) {
                setLoader(true);
                try {
                    const response = await axios.get('http://localhost:8080/api/searchDoctors', {
                        params: { ...formData, search: debouncedSearchTerm }
                    });
                    setSearchDoctors(response.data.doctorList);
                    setErrors([]);
                } catch (error) {
                    setErrors(prev => [...prev, error.response.data.message]);
                } finally {
                    setLoader(false);
                }
            }
        };

        fetchDoctors();
    }, [debouncedSearchTerm, formData.city]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value || '',
        }));
    };

    return loader ? (
        <LoaderPage />
    ) : (
        <>
            <ToastContainer />

            {/* Find & Book Your Doctor */}
            <div className="py-10 px-5">
                <div className="py-5">
                    <h1 className="text-3xl font-bold text-center mb-4">Find & Book Your Doctor</h1>
                    <SearchBar formData={formData} handleChange={handleChange} cities={cities} />
                </div>

                <div className="text-center mb-5">
                    <h2 className="text-xl font-semibold mb-3">Mostly Searched</h2>
                    <div className="flex justify-center flex-wrap gap-2">
                        {specialties.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full cursor-pointer hover:bg-blue-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {errors.length > 0 && errors.map((error, idx) => (
                    <div key={idx} className="text-red-500 font-bold text-center">{error}</div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchDoctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div>
            </div>

            {/* Privacy and security */}
            <div className="grid grid-rows-2 py-10 px-5 bg-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-32">
                    <div className="p-5">
                        <h1 className="text-2xl md:text-4xl mb-10">
                            Protecting your data is our <strong>highest priority.</strong>
                        </h1>
                        <ul className="flex flex-col space-y-2">
                            {[
                                "Advanced encryption protocols for secure data transmission",
                                "Real-time monitoring to detect and prevent potential threats",
                                "Comprehensive disaster recovery systems for data integrity",
                                "Zero-trust architecture ensuring restricted access control",
                                "Compliance with global data protection regulations and standards"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="blue"
                                        strokeWidth="2"
                                        className="h-6 w-6 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-5 flex items-center justify-center">
                        <img src="/icons/safetyLogo.png" alt="Safety Logo" className="w-96 lg:max-w-full h-auto" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {[
                        {
                            image: "/icons/securityFeature1.webp",
                            title: "Multi-Level Security Checks",
                            description: "Implementing various layers of security measures to protect sensitive information."
                        },
                        {
                            image: "/icons/securityFeature2.webp",
                            title: "Multiple Data Backups",
                            description: "Regular data backups to ensure data recovery in case of loss."
                        },
                        {
                            image: "/icons/securityFeature3.webp",
                            title: "Stringent Data Privacy Policies",
                            description: "Strict policies in place to ensure data privacy and user protection."
                        },
                        {
                            image: "/icons/securityFeature4.webp",
                            title: "24/7 Support",
                            description: "Round-the-clock support to assist users with security concerns."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="flex flex-col justify-center items-center p-5 border rounded-lg shadow-md transition-all hover:scale-105 bg-white">
                            <img src={feature.image} alt={feature.title} className="w-16 h-16 mb-2" />
                            <h2 className="text-xl font-semibold mb-1 text-center">{feature.title}</h2>
                            <p className="text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Appoitment Allocation */}
            <div className="grid grid-cols-1 md:grid-cols-2 py-10 px-5">
                <div className="p-5">
                    <h1 className="text-2xl md:text-4xl mb-10">
                        Schedule Your <strong>Appointment</strong> Now—Doctors Available Instantly!
                    </h1>
                    <ul className="flex flex-col space-y-2">
                        {[
                            "Over 100,000 Trusted Physicians",
                            "More than 3 Million Patient Endorsements",
                            "Serving 25 Million Patients Annually",
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="blue"
                                    strokeWidth="2"
                                    className="h-6 w-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/takeAppointment">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 my-5 md:p-1 md:mb-2 md:me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span className="relative px-1 py-3 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Take Appointment
                            </span>
                        </button>
                    </Link>
                </div>

                <div className="p-5">
                    <>
                        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                            <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                                <Carousel>
                                    <img src="/images/device-mockup-background1.webp" alt="Device mockup background" />
                                    <img src="/images/device-mockup-background2.avif" alt="Device mockup background" />
                                    <img src="/images/device-mockup-background3.jpg" alt="Device mockup background" />
                                    <img src="/images/device-mockup-background4.webp" alt="Device mockup background" />
                                    <img src="/images/device-mockup-background5.webp" alt="Device mockup background" />
                                </Carousel>
                            </div>
                        </div>
                        <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800" />
                        </div>
                    </>

                </div>
            </div>

            {/* Personalised chat */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 px-5 bg-slate-100">
                <div className="p-5">
                    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
                        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
                        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
                        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
                        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
                        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
                            <div className="flex flex-col items-start gap-2.5 p-5 pt-10">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="/images/doctor_default.jpg"
                                    alt="Jese image"
                                />
                                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Dr. Saulanke
                                        </span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            11:46
                                        </span>
                                    </div>
                                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                                            {" "}
                                            That's awesome. I think our users will really appreciate the
                                            improvements.
                                        </p>
                                    </div>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Delivered
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 w-full max-w-[320px] my-10">
                                    <div className="flex flex-row-reverse items-center space-x- rtl:space-x-reverse">
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            11:46
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            You
                                        </span>
                                    </div>
                                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-es-xl dark:bg-gray-700">
                                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                                            {" "}
                                            That's awesome. I think our users will really appreciate the
                                            improvements.
                                        </p>
                                    </div>
                                    <span className="text-sm text-right font-normal text-gray-500 dark:text-gray-400">
                                        Delivered
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="p-5">
                    <h1 className="text-2xl md:text-4xl mb-10">
                        Say <strong>Goodbye</strong> to Long Waits.
                    </h1>
                    <ul className="flex flex-col space-y-2">
                        {[
                            "Connect with a doctor from the comfort of your home.",
                            "Affordable Consultations Starting at ₹99.",
                            "Instant Replies from Verified Healthcare Professionals in Just 5 Minutes.",
                            "Enjoy Complete Privacy and Confidentiality.",
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="blue"
                                    strokeWidth="2"
                                    className="h-6 w-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/takeConsultance">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 my-5 md:p-1 md:mb-2 md:me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span className="relative px-1 py-3 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Take Consultance
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Pathelogist services */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 px-5 gap-10">
                <div className="p-5">
                    <h1 className="text-2xl md:text-4xl mb-10">
                        Your <strong>Diagnostic Partner</strong> at Fingertips.
                    </h1>
                    <ul className="flex flex-col space-y-2">
                        {[
                            "Connect with qualified pathologists without the wait.",
                            "Affordable Consultations Starting from ₹99.",
                            "Quick Feedback from Trusted Pathology Experts in 5 Minutes.",
                            "Total Confidentiality for All Your Health Matters.",
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="blue"
                                    strokeWidth="2"
                                    className="h-6 w-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/takePathelogistTests">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 my-5 md:p-1 md:mb-2 md:me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span className="relative px-1 py-3 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Take Pathelogist Tests
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="p-5 bg-white rounded-lg">
                    <div className="p-5 flex items-center justify-center">
                        <img src="/images/pathelogist-side-img.jpg" alt="Safety Logo" className="w-96 lg:max-w-full h-auto" />
                    </div>
                </div>
            </div>

            {/* Medical services */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 px-5 gap-10 bg-slate-100">
                <div className="bg-white rounded-lg">
                    <div className="p-5 flex items-center justify-center bg-slate-100">
                        <img src="/images/pharmacy-side-img.svg" alt="Safety Logo" className="w-96 lg:max-w-full h-auto bg-slate-100" />
                    </div>
                </div>

                <div className="p-5">
                    <h1 className="text-2xl md:text-4xl mb-10">
                        <strong>Effortless</strong> Access to Your Medicines.
                    </h1>
                    <ul className="flex flex-col space-y-2">
                        {[
                            "On-time delivery you can rely on!",
                            "Browse a comprehensive inventory of over 130,000 authentic medicines.",
                            "Receive your order at home within 24 hours.",
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="blue"
                                    strokeWidth="2"
                                    className="h-6 w-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/orderMedicines">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 my-5 md:p-1 md:mb-2 md:me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span className="relative px-1 py-3 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Order Medicines
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Medical records */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center py-10 px-5 gap-10">
                <div className="p-5">
                    <h1 className="text-2xl md:text-4xl mb-10">
                        <strong>Centralized</strong> Medical Records, Securely Stored.
                    </h1>
                    <ul className="flex flex-col space-y-2">
                        {[
                            "Experience 256-bit end-to-end encryption for your peace of mind.",
                            "Only you can view your medical records—total confidentiality guaranteed.",
                            "Enjoy hassle-free access to your records from over 8,000 locations.",
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="blue"
                                    strokeWidth="2"
                                    className="h-6 w-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Link to="/medicalRecords">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 my-5 md:p-1 md:mb-2 md:me-2 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                            <span className="relative px-1 py-3 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Find out more
                            </span>
                        </button>
                    </Link>
                </div>

                <div className="p-5 bg-white rounded-lg">
                    <div className="p-5 flex items-center justify-center">
                        <img src="/images/medical-side-img.svg" alt="Safety Logo" className="w-96 lg:max-w-full h-auto" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Section;
