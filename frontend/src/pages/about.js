import React, { useState, useEffect } from 'react';


import dr2 from '../photo/doc.png';
import doc from '../photo/avail doctor.png';
import Carousel from "nuka-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import half from '../photo/a.png'
import { AiFillCaretLeft, AiFillCaretRight, AiFillHeart } from 'react-icons/ai';
import { BsShieldLockFill } from 'react-icons/bs';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Typewriter from "typewriter-effect"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';


function About() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [written, setWritten] = useState("");
    const [loading, setLoading] = useState(false)


  const [windowWidth, setWindowWidth] = useState(() => window.screen.width)
 
  useEffect(() => {
    window.onresize = () => setWindowWidth(window.screen.width)
  }, []);

  const emailnotify = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/email_notify", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: username,
            email: email,
            phone: phone,
            written: written,
        }),
    })
        .catch((error) => {
            console.error('Error:', error);
        });
    res = await res.json();
};

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
            alert("eveIT will get in touch with you shortly.")
        })
        .then(() => {
            emailnotify()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

 
  return (
    <div className="App overflow-x-hidden">
      <Header />
      {/* =============== Banner =============== */}
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
              <AiFillCaretLeft className="absolute rounded-full shawdow-lg p-1 mt-72 bg-transparent text-black text-4xl" />
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
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>Our specialized doctors provide you the best regime for smoother skin and silkier hair.</p>
              <div className='flex gap-2 lg:gap-8 pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
          <div className='screen2 slide !w-[100vw] flex h-[30rem] lg:h-[37.6rem] pl-10 lg:pl-28 '>
            <div className='w-[30rem] lg:w-[40rem]   pt-16 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
                Healthy Living 
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>Healthy lifestyle benefits are easily attainable. We provide healthy living standards and solutions.</p>
              <div className='flex gap-2 lg:gap-8 pt-14 text-white font-normal'>
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
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'>Our opinion includes a complete review of the patient’s treatment to determine whether there has been a deviation in the standard of care.</p>
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
            <div className='w-[30rem] lg:w-[40rem]   pt-16 lg:pt-32 text-white'>
              <h2 className=' text-4xl w-9/12 lg:w-full lg:text-6xl font-bold leading-[50px] lg:leading-[60px]'>
              General Wellness
              </h2>
               <p className='text-2xl lg:font-regular lg:text-lg pt-4'> By having regular appointments with honest communication, our physician can develop the best plan for your health care needs.</p>
              <div className='flex gap-2 lg:gap-8 pt-14 text-white font-normal'>
                <button className='text-lg rounded-lg bg-[#9AB898] px-6 py-3 '>  <Link to="/appointment"  >Consult Now</Link></button>
                <p className='text-lg text-gray-400 pt-3'> OR</p>
                <a href="https://wa.me/919136427933?text=hello " className='text-lg rounded-lg bg-[#E94C60] px-6 py-3'> Message Us  <i className=" fa fa-whatsapp text-white text-2xl pl-2"></i> </a>
              </div>
            </div>
          </div>
        </Carousel >
      </section>
      <div className='px-20 lg:px-40 text-center pt-20'>
      <h3 className='text-4xl font-bold pt-2'>About Us</h3>
      <p className='text-3xl lg:text-xl text-black text-justify md:text-center pt-6'>We, CareNest are healthcare professionals who have come together to make a difference in healthy living and lifestyle. Our vision is to help all age groups and all genders, keeping in mind that everyone needs professional advice irrespective of the mentioned age, gender. We provide analyzed products with professional advice. We believe telehealth and advice can make a difference in healthy living making a difference in the lifestyle of our country. With telehealth, we can reach people with no restrictions and can approach the vast majority of people who lack professional advice, also in today's busy schedule in cities, it is important to opt for quick advice for healthy living, tele advice is quick, less time consuming and gives clarity.</p>
      </div>
    
      <img className=" float-right" src={half} alt="halfcircle" />
  {/* =============== Why choose us =============== */}
     
      <div className='w-full flex pl-20'>
        <div className='w-full lg:w-1/2 pt-10 '>
          <h3 className='text-4xl font-bold pt-2'>Why Choose Us?</h3>
          <p className='text-3xl text-black lg:text-gray-500 pt-6'>Because we have plan for your better health!</p>
          <div className='container flex mt-6 p-2 lg:p-2 ml-10 md:ml-0 w-[60rem] lg:w-[40rem] h-28 lg:h-24 hover:bg-[#E94C60] hover:items-white rounded-lg'>
            <div className='cont w-16 h-16 rounded-lg bg-[#E94C60] text-white p-4 mt-2 '>
              <BsShieldLockFill className=' w-8 h-8' />
            </div>
            <p className=' text-2xl lg:text-lg pl-4 hover:text-white font-bold' >Confidential<br />
              <span className='text-[18px] lg:text-sm lg:font-normal text-gray-600 hover:text-white font-normal leading-2' >Allow you to get secure and private counseling via your own tablet and smartphones.</span>
            </p>
          </div>

          <div className='container flex mt-4 px-2 py-4 ml-10 md:ml-0 w-[50rem]  lg:w-[40rem] h-24 hover:bg-[#E94C60] hover:items-white rounded-lg '>
            <div className='cont  w-16 h-16 rounded-lg bg-[#E94C60] text-white p-4 '>
              <AiFillHeart className=' w-8 h-8' /></div>
            <p className=' text-2xl lg:text-lg pl-4 hover:text-white font-bold' >Comfortable To Use<br />
              <span className='text-[18px] lg:text-sm lg:font-normal text-gray-600  hover:text-white font-normal'>No need to make appointment and go to counselor's office in advance.</span></p>
          </div>
          <div className='container flex mt-2 px-2 py-4 ml-10 md:ml-0 w-[50rem] lg:w-[40rem] h-24 hover:bg-[#E94C60] hover:items-white rounded-lg '>

            <div className='cont square  w-16 h-16 rounded-lg bg-[#E94C60] text-white p-4 '>
              <FaRegCalendarAlt className=' w-8 h-8' /></div>
            <p className=' text-2xl lg:text-lg pl-4 hover:text-white font-bold ' >Flexible<br />
              <span className='text-[18px] lg:text-sm lg:font-normal  text-gray-600 hover:text-white  font-normal'>Flexible consultation time slots that are more convenient for you.
              </span></p>
          </div>


        </div>
        <div className='content hidden lg:flex w-[42rem] h-[16rem] lg:h-[26rem]  ml-0 lg:ml-12 mt-52 lg:mt-14'>
          <img className="w-52 h-60" src={doc} alt="" />
          <img className="w-[16rem] lg:w-[25rem] h-[24rem] lg:h-[29rem] -mt-32  lg:-mt-12" src={dr2} alt="beautiful-asian-doctor-lady" />

        </div>


    </div>
   

     
      <img className="absolute rotate-180 lg:-mt-20" src={half} alt="halfcircle" />

      <div className=" lg:px-40 px-10 pb-10 pt-20">
                    <h2 className="font-bold text-4xl mt-3 text-center">
                        Get In Touch
                    </h2>

                    <div className="mt-12 md:flex md:mx-14 lg:ml-20">
                        <div className="md:w-1/2 my-auto">
                            <div className=" md:w-72">
                                <h3 className="text-3xl font-bold">
                                    Office Address
                                </h3>
                                <p className="mt-6">
                                B-122, Mittal Court, Nariman Point, Mumbai - 400021.
                                </p>
                                <p className="text-lg mt-10">
                                    Reach out to us at <br />
                                    <i className="fa fa-phone" aria-hidden="true" /><a href="tel:+917303880247"> +91 91364 27933</a><br />
                                    <i className="fa fa-envelope" aria-hidden="true" /><a href="mailto: contact@carenest.in"> contact@carenest.in</a>
                                </p>
                            </div>
                        </div>

                        <div className="md:w-1/2 md:mt-0 mt-10 ml-10 md:ml-20">
                        <form onSubmit={(e) => submitForm(e)}>
                        <div className='lg:3/4 mt-6 lg:mr-3'>
                        <label htmlFor="name" className="block font-semibold">Your Name</label>
                  <input type="text"
                    className="w-full px-3 py-2 rounded-xl mt-2 border-2 border-[#E94C60]"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>
                <div className='lg:3/4 mt-6 lg:mr-3'>
                <label htmlFor="email" className="block font-semibold">Your Email</label>
                  <input type="email"
                    className="w-full px-3 py-2 rounded-xl mt-2 border-2 border-[#E94C60]"
                    name="email"
                    id="email"
                    placeholder="Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div className='lg:3/4 mt-6 lg:mr-3'>
                <label htmlFor="phone" className="block font-semibold">Your Phone Number</label>
                  <input type="tel"
                    className="w-full px-3 py-2 rounded-xl mt-2 border-2 border-[#E94C60]"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    placeholder="Phone Number (e.g: 9876543210)"
                    required
                  />
                </div>
                <div className='lg:3/4 mt-6 lg:mr-3'>
                                    <label htmlFor="written" className="block font-semibold">Message</label>
                                  
                <textarea rows={6} className="w-full h-20 px-3 py-2 rounded-xl mt-2 border-2 border-[#E94C60]"
                  name="written"
                  id="written"
                  value={written}
                  onChange={(e) => setWritten(e.target.value)}
                  placeholder="Write something..." />
              </div>
                                <div className="mt-4 ">

                                    <button type="submit"
                                        className="px-4 py-2 bg-[#E94C60] font-bold rounded-lg  text-white transition duration-100 ease-in"

                                        defaultValue="Submit"
                                        disabled={loading ? true : false}>
                                        {loading ? "Submitted" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*<div className="mt-12">
                    <iframe src="https://www.google.com/maps/embed?"
                        className="md:w-4/5  w-full lg:ml-28  md:h-96 h-64 rounded"
                        loading="lazy">
                    </iframe>
                </div>

          */}
            
    <Footer />
    </div>

    )

    };
    
export default About;
