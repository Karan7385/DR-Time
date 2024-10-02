import React from 'react';
import 'flowbite';
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Accordion } from "flowbite-react";

function FAQs() {
    return (
        <>
            <div className="w-10/12 mx-auto my-10">
                <h1 className="text-center font-bold text-4xl my-2"><i>Explore</i></h1>
                <Tabs aria-label="Default tabs" variant="default">
                    <Tabs.Item active title="Statistics" icon={HiUserCircle}>
                        <div
                            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                            id="stats"
                            role="tabpanel"
                            aria-labelledby="stats-tab"
                        >
                            <dl className="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Certified Doctors</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">
                                        Trusted Pharmacy
                                    </dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">1M+</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">
                                        Satisfied Patients
                                    </dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Appointment</dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">
                                        Hospitals added
                                    </dd>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                                    <dd className="text-gray-500 dark:text-gray-400">Organizations</dd>
                                </div>
                            </dl>
                        </div>
                    </Tabs.Item>

                    <Tabs.Item title="Services" icon={MdDashboard}>
                        <div
                            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                            id="about"
                            role="tabpanel"
                            aria-labelledby="about-tab"
                        >
                            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                We invest in the world’s potential
                            </h2>
                            {/* List */}
                            <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">AI-Based Appointment Allocation</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Prescription Generator</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Generic Medicines Awareness</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Pathologist Support</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Telemedicine Services</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Pharmacy Support</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Ayurvedic Treatments with Certified Doctors</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Insurance Claim Assistance</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Fitness and Nutrition Consulting</span>
                                </li>
                                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                                    <svg
                                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    <span className="leading-tight">Health Education and Workshops</span>
                                </li>
                            </ul>
                        </div>
                    </Tabs.Item>

                    <Tabs.Item title="FAQ'S" icon={HiAdjustments}>
                        <Accordion>
                            <Accordion.Panel>
                                <Accordion.Title>What is DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        DR-Time is an innovative healthcare platform that utilizes AI to optimize appointment scheduling, prescription generation, and telemedicine support.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>How does AI improve appointment allocation?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Our AI algorithms analyze patient needs, doctor availability, and historical data to efficiently allocate appointments, reducing wait times and improving service.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Can I receive prescriptions through DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Yes, DR-Time offers a prescription generator that allows healthcare professionals to provide digital prescriptions for patients, ensuring easy access to necessary medications.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Are generic medicines available through the platform?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Yes, DR-Time promotes awareness of generic medicines and offers them through our partnered pharmacies, providing cost-effective alternatives to brand-name drugs.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>What support does DR-Time provide for pathologists?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Our platform connects patients with pathologists for lab test interpretations and second opinions, ensuring comprehensive healthcare support.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>How does telemedicine work with DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        DR-Time facilitates telemedicine consultations, allowing patients to connect with healthcare professionals via video or chat for remote evaluations and advice.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>What pharmacy support does DR-Time offer?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        We partner with local pharmacies to ensure timely medication delivery and provide support for prescription refills and queries through the DR-Time platform.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>What are some medicure tips available through DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        DR-Time offers various medicure tips focused on improving overall health, skin care, and wellness through informative articles and expert advice.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>How secure is my personal health information on DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        We prioritize your privacy and security. DR-Time employs advanced encryption and data protection measures to safeguard your personal health information.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Is DR-Time accessible for everyone?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Yes, DR-Time is designed to be user-friendly and accessible for individuals of all ages, ensuring everyone can benefit from our healthcare services.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>What types of Ayurvedic treatments are offered on DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        DR-Time provides access to certified doctors specializing in Ayurvedic treatments, including herbal therapies, dietary guidance, and holistic wellness practices.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Can I schedule follow-up appointments through DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Yes, DR-Time allows you to schedule follow-up appointments seamlessly, ensuring continuity of care with your healthcare providers.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>How does DR-Time ensure the quality of healthcare professionals?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        We thoroughly vet and verify all healthcare professionals on our platform to ensure they meet the highest standards of care and expertise.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Can I consult with a doctor for lifestyle-related health issues?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Yes, DR-Time connects you with healthcare professionals who specialize in lifestyle medicine, helping you manage conditions related to diet, exercise, and wellness.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Are there any costs associated with using DR-Time services?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        While some services may incur fees, many features, including health tips and appointment scheduling, are offered for free or at a minimal cost.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>How can I provide feedback on my experience with DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        You can provide feedback through the app or website, helping us improve our services and better meet your healthcare needs.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>What types of prescriptions can be generated through DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        DR-Time allows for the generation of prescriptions for a wide range of medications, including over-the-counter and prescription-only drugs.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>Can I access my health records through DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        Yes, DR-Time provides a secure way for you to access and manage your health records, enabling you to keep track of your medical history.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>How does DR-Time handle appointment reminders?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        DR-Time sends automated reminders via push notifications or SMS to help you remember your upcoming appointments.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                            <Accordion.Panel>
                                <Accordion.Title>What should I do if I encounter technical issues with DR-Time?</Accordion.Title>
                                <Accordion.Content>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                                        If you face any technical difficulties, you can reach out to our support team through the app or website for assistance.
                                    </p>
                                </Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                    </Tabs.Item>

                </Tabs>
            </div>

        </>
    )
}

export default FAQs
