import React from 'react';

import { Carousel } from "flowbite-react";
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';

import { FaStethoscope, FaClock, FaHospitalAlt } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';

import FAQs from '../home/components/FAQs';

import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

// Image import
import carousel1 from '/public/carouselImages/carousel-img-1.png';
import carousel2 from '/public/carouselImages/carousel-img-2.png';
import carousel3 from '/public/carouselImages/carousel-img-3.png';
import carousel4 from '/public/carouselImages/carousel-img-4.png';
import carousel5 from '/public/carouselImages/carousel-img-5.png';

function Services() {
    return (
        <>
            <Navbar page="services" />

            {/* About Dr. Time */}
            <div className="flex flex-col lg:flex-row justify-center items-center space-between lg:text-justify my-10">
                <div className="p-10">
                    {/* Section Heading */}
                    <h2 className="text-lg md:text-4xl font-extrabold text-gray-800 mb-6 flex items-center gap-10">
                        About
                        <div className='flex items-center'>
                            <div className="text-green-500 animate-bounce duration-150">DR</div>
                            <span className="text-gray-800 mx-1 animate-pulse delay-300">.</span>
                            <div className="text-blue-500 animate-bounce delay-200">TIME</div>
                        </div>
                    </h2>

                    {/* Section Description */}
                    <div className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        <ul className="list-disc pl-5">
                            <li className="mb-3">
                                <FaStethoscope className="inline-block text-blue-500 mr-2" />
                                <strong>AI-powered healthcare scheduling:</strong> DR-Time is an advanced AI solution designed to revolutionize healthcare appointment scheduling and resource management. By optimizing doctor availability and patient allocation, DR-Time ensures that healthcare providers can focus on delivering the best possible care while minimizing waiting times and improving overall efficiency.
                            </li>
                            <li className="mb-3">
                                <HiOutlineLightBulb className="inline-block text-yellow-500 mr-2" />
                                <strong>Leveraging cutting-edge technology:</strong> DR-Time adapts to the unique needs of each hospital or clinic, enabling smarter decisions and streamlined processes.
                            </li>
                            <li className="mb-3">
                                <FaHospitalAlt className="inline-block text-green-500 mr-2" />
                                <strong>Seamless integration:</strong> Whether you're a large hospital managing multiple departments or a small clinic focused on patient satisfaction, DR-Time integrates seamlessly into your workflow.
                            </li>
                            <li className="mb-3">
                                <FaClock className="inline-block text-red-500 mr-2" />
                                <strong>Improved time allocation:</strong> Its intuitive interface and smart algorithms help medical staff and patients coordinate effortlessly, providing a seamless and stress-free experience. With DR-Time, healthcare professionals can now allocate their time more effectively, ultimately improving patient outcomes.
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="transition-all delay-100 hover:scale-105 p-10">
                    <img className='shadow-lg rounded-lg' src="/icons/intro-image.jpg" alt="Intro image" />
                </div>
            </div>

            <hr className="border 4 bg-slate-500" />

            {/* Partnership */}
            <div
                className="flex justify-center items-center my-10 w-full"
                style={{
                    backgroundImage: 'url(/images/backgroundImg.webp)', // Replace with your image path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh', // Adjust height as needed
                }}
            >
                <Card className="max-w-2xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6 opacity-100 transition-transform duration-300 transform hover:scale-105">
                    <h5 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Partnerships Enhance Care!</h5>
                    <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
                        At DR-Time, we believe that every healthcare professional has the power to improve lives. Join us in this mission!
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Link
                            to="/doctors/doctorForm"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                fill="currentColor"
                            >
                                <path d="M12 0a10 10 0 0 0-10 10c0 5.25 6.25 11.2 9.62 14.3a2.53 2.53 0 0 0 3.16 0C15.75 21.2 22 15.25 22 10A10 10 0 0 0 12 0zm0 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-1.5-8.5v1.25A1.5 1.5 0 1 1 12 12v-2a2.5 2.5 0 0 0-2.5 2.5v1.25a1.5 1.5 0 1 1-3 0v-1.25A4.5 4.5 0 0 1 12 9.5z" />
                            </svg>

                            <span>Doctors</span>
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                fill="currentColor"
                            >
                                <path d="M16.5 0a1.5 1.5 0 0 1 1.5 1.5v2h2a1.5 1.5 0 0 1 0 3h-2v2a1.5 1.5 0 0 1-3 0v-2h-2a1.5 1.5 0 0 1 0-3h2v-2a1.5 1.5 0 0 1 1.5-1.5zM3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2 0v14h14V5H5z" />
                            </svg>

                            <span>Pharmacy</span>
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-lg bg-yellow-600 px-5 py-3 text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                fill="currentColor"
                            >
                                <path d="M12 0a2 2 0 0 1 2 2v2h-4V2a2 2 0 0 1 2-2zM5 5h14v14H5V5zm7 3H8v2h4v-2zm0 4H8v2h4v-2zm0 4H8v2h4v-2zM19 5v14H5V5h14zm-4 2h-4v2h4V7zm0 4h-4v2h4v-2z" />
                            </svg>

                            <span>Pathologist</span>
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center rounded-lg bg-lime-600 px-5 py-3 text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-300 transition duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                                fill="currentColor"
                            >
                                <path d="M12 2C10.35 2 9 3.35 9 5c0 1.19.64 2.26 1.59 2.87C10.03 8.78 10 9.38 10 10v1.59l-3.29 3.29c-.63.63-.63 1.71 0 2.34s1.71.63 2.34 0L12 14.59l3.29 3.29c.63.63 1.71.63 2.34 0s.63-1.71 0-2.34L14 13.59V12c0-.62.03-1.22.59-1.65C13.36 7.26 14 6.19 14 5c0-1.65-1.35-3-3-3zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                <path d="M20 14c-.53 0-1.05-.21-1.41-.59l-1.36-1.36c-1.36 1.36-3.54 1.36-4.91 0-.36-.36-.57-.84-.57-1.41V9c0-1.66 1.34-3 3-3s3 1.34 3 3v1.14c0 .56-.21 1.05-.57 1.41l-1.36 1.36c-.36.36-.59.88-.59 1.41s.21 1.05.59 1.41c1.36 1.36 1.36 3.54 0 4.91s-3.54 1.36-4.91 0c-.36-.36-.57-.84-.57-1.41V19c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.14c0 .56.21 1.05.57 1.41 1.36 1.36 3.54 1.36 4.91 0s1.36-3.54 0-4.91c-.36-.36-.59-.88-.59-1.41s.21-1.05.59-1.41l1.36-1.36c.36-.36.88-.59 1.41-.59s1.05.21 1.41.59c.36.36.59.88.59 1.41v1.14c0 1.66 1.34 3 3 3s3-1.34 3-3v-1.14c0-.56-.21-1.05-.57-1.41l-1.36-1.36C20.21 14.21 20 14.11 20 14z" />
                            </svg>
                            lime
                            <span>Ayurvedic</span>
                        </Link>
                    </div>
                </Card>
            </div>

            <hr className="border 4 bg-slate-500" />

            {/* FAQ's */}
            <FAQs />

            <hr className="border 4 bg-slate-500" />

            {/* Carousel */}
            <div className="h-96 sm:h-96 xl:h-screen 2xl:h-screen mb-10 rounded-md p-10 pb-20 shadow-lg">
                <h1 className="text-center font-bold text-4xl mb-5"><i>Partnerships</i></h1>
                <Carousel className="h-full w-full">
                    <img className="h-full w-full object-cover rounded-lg" src={carousel1} alt="Carousel image 1" />
                    <img className="h-full w-full object-cover rounded-lg" src={carousel2} alt="Carousel image 2" />
                    <img className="h-full w-full object-cover rounded-lg" src={carousel3} alt="Carousel image 3" />
                    <img className="h-full w-full object-cover rounded-lg" src={carousel4} alt="Carousel image 4" />
                    <img className="h-full w-full object-cover rounded-lg" src={carousel5} alt="Carousel image 5" />
                </Carousel>
            </div>

            <hr className="border 4 bg-slate-500 mt-32" />

            {/* Our Works */}
            <div className="flex flex-col justify-center items-center my-10">
                <h1 className="text-center font-bold text-4xl mb-8">
                    <i>A Glimpse of Our Healthcare Innovations</i>
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full px-6">
                    {[
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
                        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                    ].map((src, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg group relative transition-all hover:scale-105"
                        >
                            <img
                                className="h-64 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                src={src}
                                alt={`Glimpse ${index + 1}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"></div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Services
