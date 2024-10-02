import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import Section from './Section.jsx';
import Footer from './components/Footer.jsx';

function Home() {

  return (
    <>
      <Navbar page="home" />
      <Section />
      <Footer />
    </>
  );
}

export default Home;
