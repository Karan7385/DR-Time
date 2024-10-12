import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "../../home/components/Navbar.jsx"
import Footer from "../../home/components/Footer.jsx";

function PharmacyForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        education: "",
        license: "",
        licenseExpiry: "",
        employer: "",
        jobTitle: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        languageSkills: "",
        researchInterests: "",
        awards: "",
        volunteerExperience: "",
        additionalInfo: "",
    });

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [certificationDocument, setCertificationDocument] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState("personal");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "profilePhoto") {
            setProfilePhoto(files[0]);
        } else if (name === "certificationDocument") {
            setCertificationDocument(files[0]);
        }
    };

    const validateForm = () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "dob",
            "gender",
            "email",
            "phone",
            "education",
            "license",
            "licenseExpiry",
            "employer",
            "jobTitle",
            "address",
            "city",
            "state",
            "zip",
        ];

        for (let field of requiredFields) {
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        // Validate form fields
        if (!validateForm()) {
            toast.error("Please fill all required fields");
            return;
        }

        // Ensure profile photo is uploaded

        if (!certificationDocument) {
            toast.error("Please upload certification document");
            return;
        }

        if (!profilePhoto) {
            toast.error("Please upload profile photo");
            return;
        }


        // Append form data to FormData object
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        data.append("profilePhoto", profilePhoto);
        data.append("certificationDocument", certificationDocument);


        // console.log(profilePhoto)
        // console.log(certificationDocument)





        try {
            const response = await axios.post(
                "http://localhost:5000/api/pharmacies",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);

            toast.success("Sign Up successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error submitting form: " + error.response.data.message);
        }


    };

    const handleNext = () => {
        setCurrentStep("professional");
    };

    const handlePrev = () => {
        setCurrentStep("personal");
    };

    return (
        <>
            <Navbar />

            <div className="w-11/12 mx-auto my-10">
                <div className="hero bg-base-50 p-4 lg:p-8 rounded-lg shadow-lg">
                    <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Form Information */}
                        <div className="text-center lg:text-left">
                            <div className="mb-20">
                                <img
                                    src="https://img.freepik.com/free-vector/coronavirus-vaccine-development-concept_23-2148534521.jpg?t=st=1724608797~exp=1724612397~hmac=80d0a1906cbdc64776afa5a0b3fc47036448425f17c487dbece5b420e1643287&w=1060"
                                    alt=""
                                />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                                Pharmaceutical Professional Registration
                            </h1>
                            <h4 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
                                Elevate Your Expertise and Connect with Industry Leaders
                            </h4>
                            <p className="text-lg lg:text-xl text-gray-600">
                                Join our vibrant platform to enhance your professional
                                visibility and network with peers and experts in the
                                pharmaceutical field.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="card bg-base-100 max-w-md lg:max-w-lg shadow-2xl p-4 lg:p-6 rounded-lg">
                            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                                {/* Personal Information */}
                                {currentStep === "personal" && (<div id="personalDiv" className="flex flex-wrap justify-center items-center -mx-3 mb-6">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-1/2 px-3 md:mb-0">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-firstName"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="grid-firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                            />
                                            {isSubmitted && formData.firstName === "" && (
                                                <p className="text-red-500 text-xs mb-2">
                                                    Please fill out this field.
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-lastName"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-lastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                            />
                                            {isSubmitted && formData.lastName === "" && (
                                                <p className="text-red-500 text-xs mt-3">
                                                    Please fill out this field.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-email"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-email"
                                            type="email"
                                            name="email"
                                            placeholder="example@example.com"
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
                                            htmlFor="grid-dob"
                                        >
                                            Date of Birth
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
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-gender"
                                        >
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                        >
                                            <option disabled value="">
                                                Select gender
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {isSubmitted && formData.gender === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-phone"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="9876543210"
                                            maxLength={10}
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        {isSubmitted && formData.phone === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-address"
                                        >
                                            Address
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-address"
                                            type="text"
                                            name="address"
                                            placeholder="123 Main St"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                        {isSubmitted && formData.address === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-city"
                                            >
                                                City
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-city"
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                            />
                                            {isSubmitted && formData.city === "" && (
                                                <p className="text-red-500 text-xs mb-2">
                                                    Please fill out this field.
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-state"
                                            >
                                                State
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-state"
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                            />
                                            {isSubmitted && formData.state === "" && (
                                                <p className="text-red-500 text-xs mb-2">
                                                    Please fill out this field.
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-zip"
                                            >
                                                ZIP Code
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-zip"
                                                type="text"
                                                name="zip"
                                                placeholder="ZIP Code"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                            />
                                            {isSubmitted && formData.zip === "" && (
                                                <p className="text-red-500 text-xs mb-2">
                                                    Please fill out this field.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>)}

                                {/* Professional Information */}
                                {currentStep === "professional" && (<div id="professionalDiv" className="flex flex-wrap justify-center items-center -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-certificationDocument"
                                        >
                                            Certification Document
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-certificationDocument"
                                            type="file"
                                            name="certificationDocument"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-profilePhoto"
                                        >
                                            Profile Photo
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-profilePhoto"
                                            type="file"
                                            name="profilePhoto"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-education"
                                        >
                                            Highest Education Level
                                        </label>
                                        <select
                                            name="education"
                                            className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-education"
                                            value={formData.education}
                                            onChange={handleInputChange}
                                        >
                                            <option disabled value="">
                                                Select education level
                                            </option>
                                            <option value="bachelor_degree">Bachelor's Degree</option>
                                            <option value="master_degree">Master's Degree</option>
                                            <option value="phd">PhD</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {isSubmitted && formData.education === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-license"
                                        >
                                            Medical License Number
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-license"
                                            type="text"
                                            name="license"
                                            placeholder="ABC-123-XYZ"
                                            value={formData.license}
                                            onChange={handleInputChange}
                                        />
                                        {isSubmitted && formData.license === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-expiry"
                                        >
                                            License Expiry Date
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-expiry"
                                            type="date"
                                            name="licenseExpiry"
                                            value={formData.licenseExpiry}
                                            onChange={handleInputChange}
                                        />
                                        {isSubmitted && formData.licenseExpiry === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-employer"
                                        >
                                            Current Employer
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-employer"
                                            type="text"
                                            name="employer"
                                            placeholder="Company/Organization Name"
                                            value={formData.employer}
                                            onChange={handleInputChange}
                                        />
                                        {isSubmitted && formData.employer === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-jobTitle"
                                        >
                                            Job Title
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-jobTitle"
                                            type="text"
                                            name="jobTitle"
                                            placeholder="e.g., Senior Pharmacist"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                        />
                                        {isSubmitted && formData.jobTitle === "" && (
                                            <p className="text-red-500 text-xs mb-2">
                                                Please fill out this field.
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-full px-3 mb-6 md:mb-0">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-additionalInfo"
                                        >
                                            Additional Information
                                        </label>
                                        <textarea
                                            className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-additionalInfo"
                                            name="additionalInfo"
                                            placeholder="Additional notes or information"
                                            value={formData.additionalInfo}
                                            onChange={handleInputChange}
                                            maxLength={200}
                                        ></textarea>
                                    </div>
                                </div>)}

                                <div className="w-full px-3 py-5">
                                    <div className="flex justify-between items-center">
                                        {currentStep === "professional" && (
                                            <button
                                                type="button"
                                                id="prev"
                                                onClick={handlePrev}
                                                className="w-1/3 bg-yellow-300 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Previous
                                            </button>
                                        )}
                                        {currentStep === "personal" && (
                                            <button
                                                type="button"
                                                id="next"
                                                onClick={handleNext}
                                                className="w-1/3 bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
                                            className="w-full mt-5 bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded"
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

export default PharmacyForm;