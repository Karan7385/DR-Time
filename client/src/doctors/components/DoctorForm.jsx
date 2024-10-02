import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../../home/components/Navbar";
import Footer from "../../home/components/Footer";

function DoctorForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    mobile: "",
    specialization: "",
    medLicenseNo: "",
    medLicenseNoExpiry: "",
    hospitalAffiliationName: "",
    hospitalAffiliationAddress: "",
    qualification: "",
    experience: "",
    institution: "",
    alternateAddress: "",
    emergencyContact: "",
    languagesSpoken: "",
    websiteLinkedIn: "",
    additionalNotes: "",
    professionalBiography: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const requiredFields = [
      "fname",
      "lname",
      "email",
      "password",
      "dob",
      "gender",
      "mobile",
      "specialization",
      "medLicenseNo",
      "medLicenseNoExpiry",
      "hospitalAffiliationName",
      "hospitalAffiliationAddress",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setProfilePhoto(e.target.files[0]);
    } else if (e.target.name === "certificate") {
      setCertificate(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      toast.error("Required field can't be empty");
      return;
    }

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    if (!profilePhoto) {
      toast.error("Please upload profile photo");
    } else {
      data.append("profilePhoto", profilePhoto);
    }

    if (certificate) {
      data.append("certificate", certificate);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/doctors", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      
      toast.success("Sign Up successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error submitting form: " + error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="w-11/12 mx-auto my-10">
      <h1 className="text-center font-bold text-4xl">Doctor Application Form</h1>
        <div className="hero bg-base-50 p-3 lg:p-8 rounded-lg shadow-lg">
          <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="text-center lg:text-left">
              <div className="mb-6 w-3/4">
                <img
                  src="https://img.freepik.com/free-vector/online-doctor-with-white-coat_23-2148519127.jpg?t=st=1724604679~exp=1724608279~hmac=91d3d8d894014d2afe51cf559324ed8132481fe8b2a6869ba45cc267f39af988&w=740"
                  alt=""
                />
              </div>
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
            </div>

            <div className="card bg-base-100 max-w-md lg:max-w-lg shadow-2xl p-4 lg:p-6 rounded-lg">
              <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      name="fname"
                      type="text"
                      placeholder="John"
                      value={formData.fname}
                      onChange={handleChange}
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
                      Last Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      name="lname"
                      type="text"
                      placeholder="Doe"
                      value={formData.lname}
                      onChange={handleChange}
                    />
                    {isSubmitted && formData.lname === "" && (
                      <p className="text-red-500 text-xs my-2">
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
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
                      Password
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      name="password"
                      placeholder="******************"
                      value={formData.password}
                      onChange={handleChange}
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
                      htmlFor="grid-dob"
                    >
                      Date of birth
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
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
                      value={formData.gender}
                      onChange={handleChange}
                      className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option disabled value="">
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                    {isSubmitted && formData.gender === "" && (
                      <p className="text-red-500 text-xs mb-2">
                        Please fill out this field(Select the gender).
                      </p>
                    )}
                  </div>

                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-mobile"
                    >
                      Phone Number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-mobile"
                      type="tel"
                      name="mobile"
                      placeholder="9874560123"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    {isSubmitted && formData.mobile === "" && (
                      <p className="text-red-500 text-xs mb-2">
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-specialization"
                    >
                      Specialization
                    </label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option disabled value="">
                        Select specialization
                      </option>
                      <option value="physicians">Physicians</option>
                    </select>
                    {isSubmitted && formData.specialization === "" && (
                      <p className="text-red-500 text-xs mb-2">
                        Please fill out this field(Select the specialization).
                      </p>
                    )}
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-medLicenseNo"
                    >
                      Medical License Number
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-medLicenseNo"
                      type="text"
                      name="medLicenseNo"
                      placeholder="123-456-789"
                      value={formData.medLicenseNo}
                      onChange={handleChange}
                    />
                    {isSubmitted && formData.medLicenseNo === "" && (
                      <p className="text-red-500 text-xs mb-2">
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-medLicenseNoExpiry"
                    >
                      Medical License Expiry Date
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-medLicenseNoExpiry"
                      type="text"
                      name="medLicenseNoExpiry"
                      placeholder="123-456-789"
                      value={formData.medLicenseNoExpiry}
                      onChange={handleChange}
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
                      htmlFor="grid-hospitalAffiliationName"
                    >
                      Hospital Affiliation Name
                    </label>
                    <select
                      name="hospitalAffiliationName"
                      value={formData.hospitalAffiliationName}
                      onChange={handleChange}
                      className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option disabled value="">
                        Select hospital name
                      </option>
                      <option value="physician">Physicians</option>
                    </select>
                    {isSubmitted && formData.hospitalAffiliationName === "" && (
                      <p className="text-red-500 text-xs mb-2">
                        Please fill out this field.
                      </p>
                    )}
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-hospitalAffiliationAddress"
                    >
                      Hospital Affiliation Address
                    </label>
                    <select
                      name="hospitalAffiliationAddress"
                      value={formData.hospitalAffiliationAddress}
                      onChange={handleChange}
                      className="select appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option disabled value="">
                        Select hospital address
                      </option>
                      <option value="physician">Physicians</option>
                    </select>
                    {isSubmitted &&
                      formData.hospitalAffiliationAddress === "" && (
                        <p className="text-red-500 text-xs mb-2">
                          Please fill out this field.
                        </p>
                      )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-qualification"
                    >
                      Qualification
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-qualification"
                      type="text"
                      name="qualification"
                      placeholder="Enter Qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-experience"
                    >
                      Experience in years
                    </label>
                    <div className="relative">
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-experience"
                        type="number"
                        name="experience"
                        placeholder="Enter experience"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-institute"
                    >
                      Institution
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-institute"
                      type="text"
                      name="institution"
                      placeholder="AIIMS Delhi"
                      value={formData.institution}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full px-3 py-5">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-certificate"
                    >
                      Additional Certification
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-certificate"
                      type="file"
                      name="certificate"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-AlternateAddress"
                    >
                      Alternate Address
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-alternateAddress"
                      type="text"
                      name="alternateAddress"
                      placeholder="Enter your address"
                      value={formData.alternateAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-emergencyContact"
                    >
                      Emergency Contact
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-emergencyContact"
                      name="emergencyContact"
                      type="tel"
                      maxLength={10}
                      placeholder="Enter emergency contact details"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-languagesSpoken"
                    >
                      Languages Spoken
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-languagesSpoken"
                      type="text"
                      name="languagesSpoken"
                      placeholder="Languages the doctor can communicate in"
                      value={formData.languagesSpoken}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-websiteLinkedIn"
                    >
                      Website/LinkedIn Profile
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-websiteLinkedIn"
                      type="url"
                      name="websiteLinkedIn"
                      placeholder="For additional information or professional networking"
                      value={formData.websiteLinkedIn}
                      onChange={handleChange}
                    />
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
                      placeholder="Any other relevant information or comments"
                      rows="6"
                      cols="50"
                      value={formData.additionalNotes}
                      onChange={handleChange}
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
                      placeholder="A short biography or summary of the doctor’s career"
                      rows="6"
                      cols="50"
                      value={formData.professionalBiography}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="w-full px-3 py-5">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DoctorForm;