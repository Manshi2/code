import React from "react";
import Header from "../components/Header";
import rectangle from "../photo/Rectangle 3829.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-step-progress-bar/styles.css";
import '../styles/appointment.css';
import Footer from "../components/Footer";
import AppointmentForm from '../components/AppointmentForm'
import { MetaTags } from "react-meta-tags";
function Appointment(props) {

  return (
    <>
     <MetaTags>
    <title> Book an online doctor consultation with CareNest</title>
      <meta name="description" content="Start with Online Medical Consultation, CareNest is the best online doctor consultation website to take care of your health." />
      <meta name="keywords" content="online doctor consultation, online medical consultation" />   
 
    </MetaTags>
    
      <div className="App ">
        <Header />

        <div className="text-center mx-auto px-10 lg:px-20 mt-10 mb-4 w-full md:w-[45%]">
          {/* <h2 className="text-xl font-semibold">Sop For Consult Now</h2> */}
          <h2 className="text-xl font-semibold my-4">
            Get started with a few simple questions:
          </h2>
          <p className="text-sm font-medium">
            One of the best
            things you can do
            for your health is to
            begin with us.

          </p>
        </div>

        <div className="w-full">
          <AppointmentForm />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Appointment;