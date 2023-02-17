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
      <meta name="keywords" content="online doctor consultation " />   
      
   
    </MetaTags>
      <div className="App ">
        <Header />

        <div className="px-10 lg:px-20 mt-10 mb-4 w-full md:w-[45%]">
          <h2 className="text-xl font-semibold">Consult Now</h2>
          <h2 className="text-lg font-semibold my-5">
            Get started with a few simple questions:
          </h2>
          <p className="text-sm font-medium">
            One of the best
            things you can do
            for your health is to
            begin with us.

          </p>
        </div>

        <div className="px-10 lg:px-20 flex flex-col  gap-10 lg:gap-16 md:flex-row w-full  my-10">
          <div className="left w-[20rem] md:max-w-[33.333333] lg:w-[30rem] min-h-min mb-24">

            <div className="flex justify-center items-center h-full">
              <img src={rectangle} alt="Rectangle 3829.png" className="h-full lg:h-[40rem]" />
            </div>


          </div>
          <AppointmentForm />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Appointment;