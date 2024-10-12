import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages import
import Navbar from "../home/components/Navbar";
import Footer from "../home/components/Footer";
import LoaderPage from "../home/components/LoaderPage";

function DoctorForm() {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    gender: "",
    qualification: "",
    experience: "",
    institution: "",
    specialization: "",
    medLicenseNo: "",
    medLicenseNoExpiry: "",
    hospitalAffiliationName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    additionalNotes: "",
    professionalBiography: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState("personal");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePhoto") {
      setProfilePhoto(files[0]);

    } else if (name === "certificate") {
      setCertificate(files[0]);
    }
  };

  const validateForm = useCallback(() => {
    let tempErrors = {};

    const requiredFields = [
      "fname",
      "lname",
      "email",
      "password",
      "mobile",
      "dob",
      "gender",
      "qualification",
      "experience",
      "institution",
      "specialization",
      "medLicenseNo",
      "medLicenseNoExpiry",
      "hospitalAffiliationName",
      "street",
      "city",
      "state",
      "zipcode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        tempErrors[field] = `${field} is required`;
        toast.error(`${field} is required`);
      }
    });

    if (!profilePhoto) {
      tempErrors.profilePhoto = "Profile Photo is required";
      toast.error("Profile Photo is required");
    }

    if (!certificate) {
      tempErrors.certificate = "Degree Certification is required";
      toast.error("Degree Certification is required");
    }

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
  }, [formData, profilePhoto, certificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setLoader(true);

    if (validateForm()) {
      const data = new FormData();

      for (const key in formData) {
        data.append(key, formData[key]);
      }

      data.append("profilePhoto", profilePhoto);
      data.append("certificate", certificate);

      try {
        const response = await axios.post("http://localhost:8080/api/doctorsForm", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        setErrors({});
        Cookies.set('sessionDoctorId', response.data.sessionId, { expires: 1 });
        navigate('/doctor/dashboard', { state: { user: response.data.message }, replace: true });

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

  const handleNext = () => {
    setCurrentStep("professional");
  };

  const handlePrev = () => {
    setCurrentStep("personal");
  };

  return loader ? (<LoaderPage />) : (
    <>
      <ToastContainer />
      <Navbar />

      <div className="w-11/12 mx-auto my-10">
        <div className="hero bg-base-50 p-3 lg:p-8 rounded-lg shadow-lg">
          <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Doctors Registration info */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-3xl font-bold mb-4">
                DOCTOR'S REGISTRATION
              </h1>
              <h4 className="text-lg lg:text-xl font-semibold mb-4">
                Patients are looking for doctors like you
              </h4>
              <p className="text-base lg:text-lg">
                Millions of patients are looking for the right doctor on DR.
                TIME. Start your digital journey with DR. TIME Profile
              </p>
              <div className="mt-6 w-3/4 mx-auto">
                <img
                  src="/images/doctors/registration-image.avif"
                  alt="Doctors Registration image"
                />
              </div>
            </div>

            <div className="card bg-base-100 max-w-4xl lg:max-w-lg shadow-md p-4 lg:p-6 rounded-lg mx-auto">
              <form className="w-full max-w-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                {/* Personal Information */}
                {currentStep === "personal" && (
                  <div id="personalDiv" className="flex justify-center flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        First Name <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        name="fname"
                        type="text"
                        placeholder="John"
                        value={formData.fname}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.fname === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Last Name <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        name="lname"
                        type="text"
                        placeholder="Doe"
                        value={formData.lname}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.lname === "" && (
                        <p className="text-red-500 text-xs my-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-email"
                      >
                        Email <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-email"
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.email === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="password"
                        name="password"
                        placeholder="******************"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.password === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-mobile"
                      >
                        Phone Number <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-mobile"
                        type="tel"
                        name="mobile"
                        placeholder="9874560123"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.mobile === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-dob"
                      >
                        Date of birth <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-dob"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.dob === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-gender"
                      >
                        Gender <span className="text-red-500"> *</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option disabled value="">
                          Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                      {isSubmitted && formData.gender === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field(Select the gender).
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Professional Information */}
                {currentStep === "professional" && (
                  <div id="professionalDiv" className="flex flex-wrap -mx-3 mb-6" >
                    <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-qualification"
                      >
                        Qualification <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-qualification"
                        type="text"
                        name="qualification"
                        placeholder="Enter Qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.qualification === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-experience"
                      >
                        Experience years <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative">
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-experience"
                          type="number"
                          name="experience"
                          placeholder="Enter experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                        />
                        {isSubmitted && formData.experience === "" && (
                          <p className="text-red-500 text-xs mb-2">
                            Please fill out this field.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-institute"
                      >
                        Institution <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-institute"
                        type="text"
                        name="institution"
                        placeholder="AIIMS Delhi"
                        value={formData.institution}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.institution === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3 md:mt-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-specialization"
                      >
                        Specialization <span className="text-red-500"> *</span>
                      </label>
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option className="hidden" value="">
                          Select specialization
                        </option>
                        <option value="physicians">Physicians</option>
                      </select>
                      {isSubmitted && formData.specialization === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-medLicenseNo"
                      >
                        Medical License Number <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-medLicenseNo"
                        type="text"
                        name="medLicenseNo"
                        placeholder="A1234567"
                        value={formData.medLicenseNo}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.medLicenseNo === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-medLicenseNoExpiry"
                      >
                        Medical License Expiry Date <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-medLicenseNoExpiry"
                        type="date"
                        name="medLicenseNoExpiry"
                        value={formData.medLicenseNoExpiry}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.medLicenseNoExpiry === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-profilePhoto"
                      >
                        Profile Photo <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-profilePhoto"
                        type="file"
                        name="profilePhoto"
                        onChange={handleFileChange}
                      />
                      {isSubmitted && profilePhoto === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-hospitalAffiliationName"
                      >
                        Hospital Affiliation Name <span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="J.J. Hospital"
                        name="hospitalAffiliationName"
                        value={formData.hospitalAffiliationName}
                        onChange={handleInputChange}
                        className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                      {isSubmitted && formData.hospitalAffiliationName === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-street"
                      >
                        Hospital Affiliation Address <span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Street address"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                      {isSubmitted && formData.hospitalAffiliationName === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-city"
                      >
                        City <span className="text-red-500"> *</span>
                      </label>
                      <select
                        id="grid-city"
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option value='' className='hidden'>Choose a City</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>{city}</option>
                        ))}
                      </select>
                      {isSubmitted && formData.city === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-state"
                      >
                        State <span className="text-red-500"> *</span>
                      </label>
                      <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                      >
                        <option value='' className='hidden'>Choose a State </option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                        ))}                                        </select>
                      {isSubmitted && formData.state === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-zip"
                      >
                        ZIP Code <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-zip"
                        type="text"
                        name="zipcode"
                        placeholder="ZIP Code"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                      />
                      {isSubmitted && formData.zipcode === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3 py-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-certificate"
                      >
                        Degree Certification <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-certificate"
                        type="file"
                        name="certificate"
                        onChange={handleFileChange}
                      />
                      {isSubmitted && certificate === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-additionalNotes"
                      >
                        Additional Notes
                      </label>
                      <textarea
                        className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-additionalNotes"
                        name="additionalNotes"
                        placeholder="Any other relevant information or comments (in 200 characters)"
                        rows="6"
                        cols="50"
                        maxLength={200}
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-professionalBiography"
                      >
                        Professional Biography
                      </label>
                      <textarea
                        className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-professionalBiography"
                        name="professionalBiography"
                        placeholder="A short biography or summary of the doctor’s career (in 300 characters)"
                        rows="6"
                        cols="50"
                        maxLength={300}
                        value={formData.professionalBiography}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                )}

                <div className="w-full px-3 py-5">
                  <div className="flex justify-between items-center">
                    {currentStep === "professional" && (
                      <button
                        type="button"
                        id="prev"
                        onClick={handlePrev}
                        className="w-1/3 bg-gradient-to-r from-lime-200 to-yellow-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold py-2 px-4 rounded"
                      >
                        Previous
                      </button>
                    )}
                    {currentStep === "personal" && (
                      <button
                        type="button"
                        id="next"
                        onClick={handleNext}
                        className="w-1/3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Next
                      </button>
                    )}
                  </div>

                  {/* Submit button only appears on the Professional step */}
                  {currentStep === "professional" && (
                    <button
                      type="submit"
                      id="submit"
                      className="w-full mt-5 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 text-teal-800 font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  )}
                </div>

              </form>

            </div>
          </div>
        </div >
      </div >

      <Footer />
    </>
  );
}

export default DoctorForm;