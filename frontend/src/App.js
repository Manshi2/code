import React, { useState, useEffect } from 'react';
import mom from './photo/mom & child health.svg'
import gen from './photo/general wellness.svg'
import nut from './photo/nutrition.svg'
import med from './photo/medical report.svg';
import health from './photo/healthy living.svg';
import skin from './photo/skin and hair.svg';
import git from './photo/image 13.png';
import girl from './photo/rem 1.jpg';
import drgirl from './photo/rem 2.jpg';
import male from './photo/rem 3.jpg';
import drmale from './photo/rem 4.jpg';
import doctor1 from './photo/doctr5.jpg';
import doctor2 from './photo/doctor-6.jpeg';
import doctor3 from './photo/doctor7.jpeg';
import doctor4 from './photo/doctor8.jpeg';
import Carousel from "nuka-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import half from './photo/a.png'
import { AiFillCaretLeft, AiFillCaretRight, AiFillHeart } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight, BsShieldLockFill } from 'react-icons/bs';
import MetaTags from 'react-meta-tags';
import './App.css';
import Typewriter from "typewriter-effect"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from 'react-router-dom';
import { FeaturedPosts } from "./sections/index";


function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [written, setWritten] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() => window.screen.width)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.onresize = () => setWindowWidth(window.screen.width)
  }, []);


  const handleCardScroll = (direction) => {
    const services = window.document.getElementById('serviceCards')
    services.scrollTo(
      direction === 'right' ? (services.scrollLeft += services.offsetWidth / 1.5) : (services.scrollLeft -= services.offsetWidth / 1.5)
    )
  }
  const emailnotify = async () => {
    const data = { username, email, phone, written };
    fetch(process.env.REACT_APP_API_URL + "/api/email_notify", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

      .then((res) => {
        res.text()

        setUsername("");
        setEmail("");
        setPhone("");
        setWritten("");
      })



      .catch((error) => {
        console.error('Error:', error);
      });

  }
  const submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = { username, email, phone, written };
    fetch(process.env.REACT_APP_API_URL + "/api/contact", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.text()

        setUsername("");
        setEmail("");
        setPhone("");
        setWritten("");
        setLoading(false);
        alert("Carenest will get in touch with you shortly.")
      })
      .then((res) => {
        emailnotify()
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
    <MetaTags>
    <title> CareNest online medical consultation for Your Health</title>
      <meta name="description" content="CareNest is an online medical consultation with for Your overall Health, Can Improve Your Life." />
      
      
   
    </MetaTags>
  
    <div className="App overflow-x-hidden">
      <Header />
      <section className="carousel-container relative">
      <Carousel
          wrapAround={true}
          slidesToShow={1}
          animation={"scroll"}
          autoplay={true}
          autoplayInterval={5000}
          dragging={true}
          renderCenterLeftControls={true}
          renderCenterRightControls={true}
          renderTopLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide} >
              <AiFillCaretLeft className="absolute rounded-full shawdow-lg p-1 mt-64 bg-transparent text-black text-4xl" />
            </button>
          )}
          renderTopRightControls={({ nextSlide }) => (
            <button onClick={nextSlide} >
              <AiFillCaretRight className="rounded-full shawdow-inner   p-1 mt-72  bg-white text-black text-4xl  " />
            </button>
          )}
          className="pb-0 mt-0">
           <div className='screen slide !w-[100vw] h-[30rem] lg:h-[37.6rem] pl-10 lg:pl-28 mt-0'>
            <div className='w-[30rem] lg:w-[40rem]  pt-16 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-full lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
                Mother and Child Healthcare 
              
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>We are dedicated to delivering the best possible care for both the mother and her child.
              </p>
              <div className='flex gap-2 lg:gap-8 pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello" className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
          <div className='screen1 slide !w-[100vw] h-[30rem] lg:h-[37.6rem] pl-10 lg:pl-28 mt-0'>
            <div className='w-[30rem] lg:w-[40rem]   pt-16 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
               Skin and Hair Care
             {/*}   <span className="text-2xl font-bold lg:text-[40px] pl-2   md:inline-block text-[#E94C60]">
                  <Typewriter
                    options={{
                      strings: ["Professional", "Personalized", "Affordable", "Accurate", "Diverse"],
                      autoStart: true,
                      loop: true,
                    }}
                  />  </span> consultations!*/}
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>We provide the best solutions for skin and hair concerns like acne, pigmentation, hair fall and more. Consult now for customised treatment. </p>
              <div className='flex gap-2 lg:gap-8 pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
          <div className='screen2 slide !w-[100vw] flex h-[30rem] lg:h-[37.6rem] pl-10 lg:pl-28 '>
            <div className='w-[30rem] lg:w-[40rem]   pt-10 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
              Mental Health and Healing
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-2 md:pt-4'>Normalize talking to an expert when having a mental health crisis. Talk to us if depressed, anxious, stress or have any mental health concern.</p>
              <div className='flex gap-2 lg:gap-8 pt-3 md:pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
          <div className='screen3 slide !w-[100vw] h-[30rem] lg:h-[37.6rem] pl-10 lg:pl-28 mt-0'>
            <div className='w-[30rem] lg:w-[40rem]    pt-12 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
                Medical Report Opinion
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>Here we have a qualified radiologist to give you an opinion on your medical reports and scans for the right treatment approach.</p>
              <div className='flex gap-2 lg:gap-8 pt-10 md:pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
         
          <div className='screen4 slide !w-[100vw] flex h-[30rem] lg:h-[37.6rem] pl-10 lg:pl-28 '>
            <div className='w-[30rem] lg:w-[40rem]    pt-16 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
                Nutrition 
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>By understanding your health history and lifestyle, our nutritionists provide you the best possible plan for your health.</p>
              <div className='flex gap-2 lg:gap-8 pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
          <div className='screen5 slide !w-[100vw] h-[30rem]  lg:h-[37.6rem] pl-10 lg:pl-28 mt-0'>
            <div className='w-[35rem] lg:w-[45rem]   pt-10 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[68px]'>
              Weight Management and Lifestyle Advice
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'> Physical health should be a priority with a stable lifestyle, we can help you with WEIGHT LOSS, WEIGHT GAIN or FITNESS with a click away, talk to a specialist now.</p>
              <div className='flex gap-2 lg:gap-8 pt-4 md:pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
         
        
        
        </Carousel >
      </section>

      <img className=" float-right" src={half} alt="halfcircle" />
      <div className='pt-20 pb-10 px-20 lg:px-40'>
        <h5 className='text-2xl lg:text-xl font-semibold text-[#E94C60] text-center'>FAST SOLUTIONS</h5>
        <h3 className='text-4xl font-bold text-center pt-2 '>Multispeciality Advices</h3>
        <Carousel wrapAround={true}
          slidesToShow={windowWidth < 800 ? 1 : 3}
          cellAlign="center"
          animation={"scroll"}
          autoplay={true}
          autoplayInterval={2000}
          dragging={true}
          renderCenterLeftControls={false}
          renderCenterRightControls={false}
          renderTopLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide} >
              <AiFillCaretLeft className="rounded-full shawdow-lg p-1 mt-44 bg-transparent text-black text-4xl  " />
            </button>
          )}
          renderTopRightControls={({ nextSlide }) => (
            <button onClick={nextSlide} >
              <AiFillCaretRight className="rounded-full shawdow-inner   p-1 mt-44 bg-white text-black text-4xl  " />
            </button>
          )}
          className=" pt-14 mx-36 lg:mx-0 pb-10 ">
          <div className=" card w-[36rem]  lg:w-80 h-[26rem] lg:h-[18rem] rounded-b-lg border-t-8 border-t-[#E94C60] border-2 px-6 ml-0 lg:ml-10 pt-8 pb-2  shawdow-xl text-center">
           <div className='flex item-center justify-center'> <img className="w-20 h-20 lg:w-14 lg:h-14" src={mom} alt="mom and child health" /></div>
            <h5 className='text-4xl lg:text-lg font-bold pt-6 md:pt-4 '>Mom and Child Healthcare</h5>
            <p className='text-2xl lg:text-sm  font-semibold lg:font-normal text-gray-500 pt-4 lg:pt-2 '>Choose an expert, based on the symptoms of your ailment.</p> 
            <div className='flex item-center justify-center pt-8'> <Link to="/appointment" ><button className='px-6 py-2 bg-[#E94C60] rounded-md text-white'>Consult</button></Link>
             </div>
          </div>
          <div className="card w-[36rem]  lg:w-80 h-[26rem] lg:h-[18rem] rounded-b-lg border-t-8 border-t-[#E94C60] border-2 px-6 pt-8 pb-2 ml-0 lg:ml-10 shawdow-2xl text-center">
          <div className='flex item-center justify-center'> <img className="w-20 h-20 lg:w-14 lg:h-14" src={gen} alt="general wellness" /></div>
            <h5 className='text-4xl lg:text-lg font-bold pt-4'> General Wellness</h5>
            <p className='text-2xl lg:text-sm  font-semibold lg:font-normal text-gray-500 pt-4 lg:pt-2'>To initiate the examination, set up an appointment with the concerned specialist.
            </p>
            <div className='flex item-center justify-center pt-4'> <Link to="/appointment" ><button className='px-6 py-2 bg-[#E94C60] rounded-md text-white'>Consult</button></Link>
             </div>
          </div>
          <div className="card  w-[36rem]  lg:w-80 h-[26rem] lg:h-[18rem]  rounded-b-lg border-t-8 border-t-[#E94C60] border-2 px-6 pt-8 pb-2 ml-0 lg:ml-10 shawdow-lg text-center">
          <div className='flex item-center justify-center'> <img className="w-20 h-20 lg:w-14 lg:h-14" src={nut} alt="nutrition" /></div>
            <h5 className='text-4xl lg:text-lg font-bold pt-4'>Nutritions</h5>
            <p className='text-2xl lg:text-sm font-semibold lg:font-normal text-gray-500 pt-4 lg:pt-2'> We can assist in determining the most effective treatment strategy following an expert assessment.
            </p>
            <div className='flex item-center justify-center pt-4'> <Link to="/appointment" ><button className='px-6 py-2 bg-[#E94C60] rounded-md text-white'>Consult</button></Link>
             </div>
          </div>
          <div className="card w-[36rem]  lg:w-80 h-[26rem] lg:h-[18rem]  rounded-b-lg border-t-8 border-t-[#E94C60] border-2 px-6 pt-8 pb-2 ml-0 lg:ml-10 shawdow-lg text-center">
          <div className='flex item-center justify-center'> <img className="w-20 h-20 lg:w-14 lg:h-14" src={med} alt="Medical Report Opinion" /></div>
            <h5 className='text-4xl lg:text-lg font-bold pt-4'>Medical Report Opinion </h5>
            <p className='text-2xl lg:text-sm font-semibold lg:font-normal text-gray-500 pt-4 lg:pt-2'> After conducting an examination with a specialist we can help find the right healing method.</p>
            <div className='flex item-center justify-center pt-4'> <Link to="/appointment" ><button className='px-6 py-2 bg-[#E94C60] rounded-md text-white'>Consult</button></Link>
             </div>
          </div>
          <div className="card w-[36rem]  lg:w-80  h-[26rem] lg:h-[18rem]  rounded-b-lg border-t-8 border-t-[#E94C60] border-2 px-6 pt-8 pb-2 ml-0 lg:ml-10 shawdow-lg text-center">
            <div className='flex item-center justify-center'><img className="w-20 h-20 lg:w-14 lg:h-14" src={health} alt="Healthy Living" /></div>
            <h5 className='text-4xl lg:text-lg font-bold pt-4'>Healthy Living</h5>
            <p className='text-2xl lg:text-sm  font-semibold lg:font-normal  text-gray-500 pt-4 lg:pt-2'> Choose a specialist according to your disease compliants.</p>
            <div className='flex item-center justify-center pt-8'> <Link to="/appointment" ><button className='px-6 py-2 bg-[#E94C60] rounded-md text-white'>Consult</button></Link>
             </div>
          </div>
          <div className="card w-[36rem]  lg:w-80 h-[26rem] lg:h-[18rem]  rounded-b-lg border-t-8 border-t-[#E94C60] border-2 px-6 pt-8 pb-2 ml-0 lg:ml-10 shawdow-lg text-center ">
          <div className='flex item-center justify-center'><img className="w-20 h-20 lg:w-14 lg:h-14" src={skin} alt="Skin and Hair" /></div>
            <h5 className='text-4xl lg:text-lg font-bold pt-4'>Skin and Hair</h5>
            <p className='text-2xl lg:text-sm  font-semibold lg:font-normal text-gray-500 pt-4 lg:pt-2'> Choose a specialist according to your disease compliants.</p>
            <div className='flex item-center justify-center pt-8'> <Link to="/appointment" ><button className='px-6 py-2 bg-[#E94C60] rounded-md text-white'>Consult</button></Link>
             </div>
          </div>
        </Carousel>
        </div>
        
      <div className='pt-20 pb-10 '>
        <h2 className='text-4xl font-bold pl-10 lg:pl-20 pb-14'>Blog Feature</h2>
        <FeaturedPosts />
      </div>
     
      <img className="absolute right-0 float-right" src={half} alt="halfcircle" />
      {/* =============== Services Cards =============== */}
      <div id="services" >
        <h3 className='text-4xl lg:text-5xl font-bold  text-center pt-12 '>The Easiest Way To Visit Us</h3>
        <p className='text-2xl font-semibold lg:font-regular text-gray-600 text-center pt-4'>We are here to help!</p>
        {/* <div className="overflow-x-auto w-screen flex justify-center"> */}
        <div id='serviceCards' className='relative flex w-screen lg:w-full overflow-x-scroll overflow-y-hidden lg:overflow-x-auto items-center px-56 lg:px-36 pt-14'>
          <div className="min-w-[60vw] mx-auto lg:min-w-min flex justify-center">
            <div id='serviceCard1' className="card w-[30rem] lg:w-[20rem]  h-[40rem] lg:h-[30rem]  rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 text-center shawdow-lg">
              <h5 className='text-4xl lg:text-xl font-bold'>FREE <br /> CONSULTATION</h5>
              <h2 className='font-bold text-4xl lg:text-2xl py-10 lg:py-8 '><i className='fa fa-inr' /> 0 </h2>
              <p className='text-2xl lg:font-regular lg:text-lg pt-10 lg:pt-4 '>Get best doctors for a free telephonic consultation</p>
              <button className='text-xl w-52 h-10 text-white px-4 py-2 mt-44 lg:mt-28 bg-[#9AB898] rounded-md' >Coming Soon</button>
            </div>
          </div>
          <div className="min-w-[60vw] mx-auto lg:min-w-min flex justify-center">
            <div id='serviceCard2' className="card w-[30rem] lg:w-[24rem] lg:h-[34rem] h-[40rem]   rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 shawdow-lg text-center">
              <h5 className='text-4xl lg:text-xl font-bold '>VIDEO CALL <br /> CONSULTATION </h5>
              <h2 className='font-bold text-4xl lg:text-2xl py-10 lg:py-12'><i className='fa fa-inr' /> 399 </h2>
              <p className='text-2xl lg:font-regular lg:text-lg pt-4'> Use a 20 min video call to consult with the doctor in a setting similar to a clinic.
              </p>
              <p className='text-2xl lg:text-lg lg:font-regular pt-8 lg:pt-4'>We carefully assess your need & match you with a counselor who perfectly fits your need.</p>
              <button className='text-xl w-52 h-10 text-white px-4 py-2  mt-12 bg-[#9AB898] rounded-md' ><a href='/appointment'>Get Started</a></button>
            </div>
          </div>
          <div className="min-w-[60vw] mx-auto lg:min-w-min flex justify-center">
            <div id='serviceCard3' className="card w-[30rem] lg:w-[20rem] h-[40rem] lg:h-[30rem]  rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 text-center shawdow-lg">
              <h5 className='text-4xl lg:text-xl font-bold '>FOLLOW-UP<br />
                   CONSULTATION</h5>
              <h2 className='font-bold text-4xl lg:text-2xl pt-8 pb-2'><i className='fa fa-inr' /> 199 </h2>
              <p className='text-2xl lg:font-regular lg:text-lg pt-14 lg:pt-6'>The frequent paid consultation enables you to have several interactions with the assigned doctor at your time convenience.
              </p>
              <button className='text-xl w-52 h-10 text-white px-4 py-2 mt-32 lg:mt-16 bg-[#9AB898] rounded-md'>
                <a href='/appointment'>Get Started</a></button>
            </div>
          </div>
        </div>
        <div className="lg:hidden w-full relative mt-5 mb-12">
          {/*}  <span onClick={() => handleCardScroll('left')} className="absolute top-1/2 transform -translate-x-1/2 left-20 w-16 h-16  flex justify-center items-center  "><AiFillCaretLeft size={35} /></span>*/}
          <span onClick={() => handleCardScroll('right')} className="absolute top-1/2 transform -translate-x-1/2 right-0 w-16 h-16  flex justify-center items-center "><BsArrowRight size={55} /></span>
        </div>
        {/* </div> */}
      </div>
      <img className="absolute rotate-180" src={half} alt="halfcircle" />

{/* =============== Subscription Cards =============== */}
      <div id="services" >
        <h3 className='text-4xl lg:text-5xl font-bold  text-center pt-20 '>Subscriptions </h3>
        <p className='text-2xl font-semibold lg:font-regular text-gray-600 text-center pt-4'> To Make It Consistent And See Results By Yourself!</p>

        
        <div id='serviceCards' className='relative flex w-screen lg:w-full overflow-x-scroll overflow-y-hidden lg:overflow-x-auto items-center px-56 lg:px-20 pt-14'>
          <div className="min-w-[60vw] mx-auto lg:min-w-[20%] flex justify-center">
            <div id='serviceCard2' className="card w-[30rem] lg:w-[20rem] lg:h-[30rem] h-[40rem]   rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 shawdow-lg text-center">
              <h5 className='text-4xl lg:text-xl font-bold uppercase'>Mother and child counseling </h5>
              <h2 className='font-bold text-4xl lg:text-2xl pt-9 pb-0'><i className='fa fa-inr' /> 1299 </h2><span className='text-sm md:text-md'>(4 sessions) </span>
              <p className='text-2xl lg:font-regular lg:text-lg pt-12 md:pt-6'> New moms and parenting can be difficult initially, you can talk to our expert every week with subscriptions.
              </p>
              <Link to='/appointment'>
                <button className='text-xl w-52 h-10 text-white px-4 py-2  mt-12 bg-[#9AB898] rounded-md' >Subscribe</button>
              </Link>
            </div>
          </div>

          <div className="min-w-[60vw] mx-auto lg:min-w-[20%] flex justify-center">
            <div id='serviceCard1' className="card w-[30rem] lg:w-[20rem]  h-[40rem] lg:h-[34rem]  rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 text-center shawdow-lg">
              <h5 className='text-4xl lg:text-xl font-bold uppercase'>Mental health care</h5>
              <h2 className='font-bold text-4xl lg:text-2xl pt-10 lg:pt-12 '><i className='fa fa-inr' /> 5099</h2><span className='text-sm md:text-md pb-10 md:pb-8'>(5 sessions) </span>
              <p className='text-2xl lg:font-regular lg:text-lg pt-10 lg:pt-10 '>Therapy, talk to our expert psychologist and keep mental health on priority, be it anxiety, stress, relationship issues, depression or more. </p>
              <Link to='/appointment'>
                <button className='text-xl w-52 h-10 text-white px-4 py-2 mt-20 lg:mt-20 bg-[#9AB898] rounded-md' >Subscribe</button>
              </Link>
            </div>
          </div>

          <div className="min-w-[60vw] mx-auto lg:min-w-[20%] flex justify-center">
            <div id='serviceCard2' className="card w-[30rem] lg:w-[20rem] lg:h-[34rem] h-[40rem]   rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 shawdow-lg text-center">
              <h5 className='text-4xl lg:text-xl font-bold uppercase '>Nutrition care </h5>
              <h2 className='font-bold text-4xl lg:text-2xl pt-16 lg:pt-12'><i className='fa fa-inr' /> 1299 </h2><span className='text-sm md:text-md pb-10 md:pb-16'>(4 Follow ups) </span>
              <p className='text-2xl lg:font-regular lg:text-lg pt-16 md:pt-10'> Gain, loose weight, total Nutrition care from child to adult.
              </p>
              <p className='text-2xl lg:text-lg lg:font-regular pt-8 lg:pt-4'>once every week to monitor your weight loss.</p>
              <Link to='/appointment'>
                <button className='text-xl w-52 h-10 text-white px-4 py-2  mt-16 bg-[#9AB898] rounded-md' ><a href='/appointment'>Subscribe</a></button>
              </Link>
            </div>
          </div>
         
          <div className="min-w-[60vw] mx-auto lg:min-w-[20%] flex justify-center">
            <div id='serviceCard3' className="card w-[30rem] lg:w-[20rem] h-[40rem] lg:h-[30rem]  rounded-b-md border-t-8 border-t-[#E94C60] border-2 px-6 pt-10 pb-8 text-center shawdow-lg">
              <h5 className='text-4xl lg:text-xl font-bold uppercase'>Physical health</h5>
              <h2 className='font-bold text-4xl lg:text-2xl pt-16 pb-0'><i className='fa fa-inr' /> 1299 </h2><span className='text-sm md:text-md pb-10 md:pb-8'>(4 sessions) </span>
              <p className='text-2xl lg:font-regular lg:text-lg pt-14 lg:pt-5'>we have qualified physiotherapist, fitness experts on board to track your fitness.
              </p>
              <Link to='/appointment'>
                <button className='text-xl w-52 h-10 text-white px-4 py-2 mt-32 lg:mt-12 bg-[#9AB898] rounded-md'>Subscribe</button>              
              </Link>  
            </div>
          </div>
        </div>
      </div>
  {/* =============== Our All-Star Experts =============== */}

      <div  className='star pt-20 px-10 lg:px-20' >
        <h3 className='text-4xl font-bold  text-center  pt-16 underline'>Our All-Star Experts</h3>
        <p className='text-2xl lg:text-lg font-semibold lg:font-normal text-gray-500  text-center pt-4'>We strive to offer you the best
          medical assistance from the best
          counsellors in India.</p>
         <div className='mx-14 lg:mx-0'>
          <Carousel
          wrapAround={true}
          slidesToShow={windowWidth < 840 ? 1 : 3}
          animation={"scroll"}
          autoplay={false}
          autoplayInterval={5000}
          dragging={true}
          renderCenterLeftControls={true}
          renderCenterRightControls={true}
          renderTopLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide} >
              <BsArrowLeft   className="absolute rounded-full shawdow-lg p-1  mt-44 bg-gray-100 text-black text-4xl" />
            </button>
          )}
          renderTopRightControls={({ nextSlide }) => (
            <button onClick={nextSlide} >
              <BsArrowRight  className="rounded-full shawdow-inner   p-1 mt-48  bg-gray-100 text-black text-4xl  " />
            </button>
          )}
          className="pb-0 mt-10 md:mt-32 mx-10 lg:mx-10">
        
          <div className='w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40  rounded-full  border-4 border-[#E94C60] " src={girl} alt="" />
            </div>
            <h3 className='text-2xl  lg:text-xl font-semibold  text-center pt-4'>Dr. Anuradha Shukla</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Skin and Hair expert</h5>
            <p className='text-2xl lg:text-sm pt-4  text-justify mb-3'>
              Dr. Anuradha Shukla comes with 8+ years of experience in treating skin and hair conditions, Has gained her training from her country and internationally and has been constantly updating her techniques in the field of medicine. She is a patient oriented Doctor who believes in implementation of science and researches for betterment of her country.
            </p>
          </div>
          <div className=' w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem]  '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40 rounded-full  border-4 border-[#E94C60] " src={drgirl} alt="" /></div>
            <h3 className='text-2xl  lg:text-xl font-semibold text-center pt-4'>Dr. Rajeshwari Shukla</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Child health expert</h5>
            <p className='text-2xl lg:text-sm pt-4 text-justify mb-6'>
              Dr. Rajeshwari Shukla has an extensive knowledge in pediatrics with her career excellence in pediatrics from national board of examinations and diploma in child health care, India. She is very professional with 11 + years of experience in medicine and believes in the best treatment outcome for her patients.

            </p>

          </div>
        
        
          <div className='w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40 rounded-full  border-4 border-[#E94C60] mt-0" src={male} alt="" /></div>
            <h3 className='text-2xl  lg:text-xl font-semibold text-center pt-4'>Dr. Govind Shukla</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>General health care</h5>
            <p className='text-2xl lg:text-sm pt-4 text-justify mb-6'>
              Dr. Govind Shukla is a Bachelor of Medicine and Bachelor of Surgery from Indian government recognized institute - Maharashtra university of health science and comes with extensive knowledge in the field of medicine with his career training from government institutes and hospitals in India.
            </p>
          </div>
          <div className='w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40  rounded-full  border-4 border-[#E94C60] " src={drmale} alt="" />
            </div>
            <h3 className='text-2xl  lg:text-xl font-semibold  text-center pt-4'>Dr. Deepak Mishra</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Radiologist</h5>
            <p className='text-2xl lg:text-sm pt-4  text-justify mb-3'>
            Dr. Deepak Mishra has more than 10 + years of experience in medicine. He is a postgraduate from the national board of examination in Radiology. He believes in Imaging with passion and knowledge, for best patient diagnosis and treatment outcome.  </p>

          </div>
          
          <div className='w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40  rounded-full  border-4 border-[#E94C60] " src={doctor1} alt="" />
            </div>
            <h3 className='text-2xl  lg:text-xl font-semibold  text-center pt-4'>Dr. Dyuti Navadia</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Gynaecologist</h5>
            <p className='text-2xl lg:text-sm pt-4  text-justify mb-3'>
            Dr Dyuti Navadia is a national board certified specialist in the field of obstetrics and gynaecology and specialises in high risk pregnancy, laproscopic, vaginal gynecological procedures and ultrasonography. She has 5+ years of experience in this field. A patient oriented personality for all new moms with us.
               </p>
          </div>
          <div className=' w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40 rounded-full  border-4 border-[#E94C60] " src={doctor2} alt="" /></div>
            <h3 className='text-2xl  lg:text-xl font-semibold text-center pt-4'>Dr. Jaisybai</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Physiotherapist</h5>
            <p className='text-2xl lg:text-sm pt-4 text-justify mb-6'>
            Dr. Jaisybai is an expert in her field of physiotherapy with more than 8 years of experience in pain management, mobility improvement, weight management and healthcare wellness. Experienced with orthopedic, neurological as well as delayed paediatric conditions. She can help you through your journey of wellness.
            </p>

          </div>
            
          <div className='w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40  rounded-full  border-4 border-[#E94C60] " src={doctor3} alt="" />
            </div>
            <h3 className='text-2xl  lg:text-xl font-semibold  text-center pt-4'>Dr. Shreya Vashi</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Psychologist</h5>
            <p className='text-2xl lg:text-sm pt-4  text-justify mb-3'>
            I am RCI certified Clinical Psychologist. I aim to help people with mental health problems by providing psychotherapy services, group therapy sessions to help them deal with psycho-social issues. I also practise family and couples interventions.I have training in evidence-based therapies of CBT, person-centred therapy Through my practice, I have commonly helped my clients cope with disorders such as depression, anxiety, OCD as well as neuropsychology problems.     </p>
          </div>
          <div className=' w-[45rem] lg:w-[24rem] lg:h-[34rem] h-[40rem] '>
            <div className='flex items-center justify-center'>
              <img className="w-40 h-40 rounded-full  border-4 border-[#E94C60] " src={doctor4} alt="" /></div>
            <h3 className='text-2xl  lg:text-xl font-semibold text-center pt-4'>Amit Dixit</h3>
            <h5 className='text-xl  lg:text-xl font-semibold text-center pt-2'>Psychologist</h5>
            <p className='text-2xl lg:text-sm pt-4 text-justify mb-6'>
            Amit Dixit is a RCI Registered Rehabilitation Psychologist. Mental health professional with a PGDRP in Rehabilitation Psychology and MA in Clinical Psychology.
             He is clinically trained in conducting psychological assessments and evaluations. His therapy dwells primarily upon the approaches of cognitive behavioural therapy, humanistic therapy, motivational enhancement therapy and client centered therapy.  </p>

          </div>
         
    
        </Carousel>
        </div>
       
      </div>
      

      <img className=" float-right -mt-14 lg:-mt-10" src={half} alt="halfcircle" />




      <div className='w-full  pt-10 lg:pt-10 text-center'>

        <h5 className='text-xl font-semibold text-[#E94C60] '>OUR RATINGS</h5>
        <h3 className='text-4xl   font-bold  pt-2 '>Our Patients Feedback About Us</h3>

        <div className='w-[60rem] mx-auto pl-8 pt-10'>

          <Carousel showArrows={true}


            renderCenterLeftControls={false}
            renderCenterRightControls={false}
            renderTopLeftControls={({ previousSlide }) => (
              <button onClick={previousSlide} >
                <AiFillCaretLeft className="rounded-full shawdow-lg p-1 mt-28 bg-transparent text-black text-4xl  " />
              </button>
            )}
            renderTopRightControls={({ nextSlide }) => (
              <button onClick={nextSlide} >
                <AiFillCaretRight className="rounded-full shawdow-outer   p-1 mt-28  bg-white text-black text-4xl  " />
              </button>
            )}>
            <div className='w-[40rem] h-[16rem] border-2 border-t-8 border-t-[#E94C60] border-gray-200 pt-6 ml-32 mb-10 px-4 rounded-lg items-center text-center justify-center'>
              <p className='text-xl lg:text-md text-gray-500 lg:text-black font-semibold lg:font-medium'>&#34;
                Great advices given by Carenest!!<br />
                One of the best healthcare services!!<br /> Highly recommended!!&#34;</p>
              <h5 className='text-3xl font-bold pt-10'>Akansha Sengupta </h5>

            </div>
            <div className='w-[40rem] h-[16rem] border-2 border-t-8 border-t-[#E94C60] border-gray-200 pt-10 ml-32 mb-10 px-4 rounded-lg items-center text-center justify-center'>
              <p className='text-xl lg:text-md text-gray-500 lg:text-black font-semibold lg:font-medium '> I have been following the information they are providing and it’s really Great, backed by authentic research.<br />
                Highly recommended!
                "</p>
              <h5 className='text-2xl font-bold pt-10'>Chaitanya Bansal </h5>

            </div>

            <div className='w-[40rem] h-[16rem] border-2 border-t-8 border-t-[#E94C60] border-gray-200 pt-10 ml-32 mb-10 px-4 rounded-lg items-center text-center justify-center'>
              <p className='text-xl lg:text-md text-gray-500 lg:text-black font-semibold lg:font-medium'>&#34;One of the best health care advices.<br /> Experienced skin care professionals.
                &#34;</p>
              <h5 className='text-2xl font-bold pt-10'>Adil Khan </h5>

            </div>

          </Carousel>

        </div>

      </div>

      <div id='contact' className="flex mt-20 lg:mt-10 pb-12 lg:pb-0 pl-24 lg:pl-20 " >
        <div className="w-[50rem] lg:w-[55rem] lg:my-10 pl-0 pr-10 lg:pr-40">
          <div className="">
            <h2 className=" mr-2 font-bold text-6xl lg:text-5xl">Contact <span className='text-[#9AB898]  ' >Us</span></h2>
            <p className='text-3xl lg:text-lg font-semibold lg:font-regular text-gray-500  pt-4'>Helping you is our top
              most priority. </p>
            <p className='text-3xl lg:text-lg font-semibold lg:font-medium text-gray-500 mt-2 pt-4'>
              We are ready to solve
              all your genuine
              queries within 48 hours.</p>
          </div>
          <div>
            <form onSubmit={(e) => submitForm(e)}>
              <div className='lg:flex w-full'>
                <div className='lg:w-1/2 mt-6 lg:mr-3'>
                  <input type="text"
                    className="p-2 rounded w-full h-20 lg:h-14  text-[1rem] border-2 border-[#E94C60]"
                    name="username"
                    id="username"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>
                <div className='lg:w-1/2 mt-6 lg:ml-3'>
                  <input type="email"
                    className="p-2 rounded w-full  text-lg md:text-[1rem] h-20 lg:h-14 border-2 border-[#E94C60]"
                    name="email"
                    id="email"
                    placeholder="Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
              </div>
              <div className='lg:flex w-full'>
                <div className='lg:w-1/2 mt-6 lg:mr-3'>
                  <input type="tel"
                    className="p-2 rounded w-full text-lg md:text-[1rem] h-20 lg:h-14 border-2 border-[#E94C60]"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    placeholder="Phone Number (e.g: 9876543210)"
                    required
                  />
                </div>
              </div>
              <div className='mt-6'>
                <textarea rows={6} className="px-5 py-3 rounded-xl w-full border-2 border-[#E94C60]"
                  name="written"
                  id="written"
                  value={written}
                  onChange={(e) => setWritten(e.target.value)}
                  placeholder="Write something..." />
              </div>
              <button type="submit"
                className="text-white text-4xl lg:text-lg font-semibold lg:font-medium rounded-lg py-5 px-14 lg:py-2 lg:px-6 bg-[#9AB898] mx-auto lg:mx-4 mt-4 lg:mt-8  border-2  "
                defaultValue="Submit"
                disabled={loading ? true : false}>
                {loading ? "Submitted" : "Submit"}

              </button>
            </form>
          </div>
        </div>
        <div className="contact  w-40  lg:w-[35rem] h-[26rem] mt-24 lg:mt-28 lg:pr-0 pl-0 lg:pl-36 ">
          <img className="w-[40rem] lg:w-[35rem] h-[45rem] -mt-52 lg:-mt-44" src={git} alt="" />
        </div>
      </div>


      <Footer />
    </div>
    </>
  );
}

export default App;
