import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
// import logo from "../photo/logo.png";
import logo from "../photo/logo-removebg-preview.png";
function Header() {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
 
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="absolute right-0 w-72 h-14 ml-10 px-2 py-1 bg-[#F4857A] rounded-lg text-white  ">
            <p
              className="absolute top-0 right-1 w-4 h-4 cursor-pointer "
              onClick={() => setShowModal(false)}
            >
              x
            </p>
            <p className="text-center pt-4 pb-4 text-sm">
              <i className="fa fa-info-circle pr-4 "> </i>
              Coming Soon
            </p>
          </div>
        </>
      ) : null}
      <header>
      <div className="w-full flex pl-8 pt-2  pb-2 bg-[#FCF9EB]">
          <i className="fa fa-x lg:fa-2x fa-phone  text-[#E94C60] mt-1 lg:mt-2"></i>
          <p className="text-sm font-bold pl-2 pt-1">
           Analysed Products and Free Consultation Calls by Experts
            <span className="text-[#E94C60] pl-2" onClick={() => setShowModal(true)}>
              Coming Soon
            </span>
          </p>
      </div>
      {/*}  <div className="w-full flex lg:inline-flex items-center flex-wrap bg-white lg:px-6 pl-4 border-b-2 shadow-lg h-auto lg:h-20">
          <div className='flex justify-left items-left'>
            <Link to="/">
              <img className="w-20 h-20 mx-20" src={logo} alt="logo" />
            </Link>
            <br />
            </div>
            <div className="flex justify-right text-right font-bold text-lg gap-10">
           <i className="fas fa fa-circle text-[8px] pt-3 text-red-400"></i>
              <Link to="/appointment">
                <h3>
                    Book Consultation
                </h3>
              </Link>
               <i className="fas fa fa-circle text-[8px] pt-3 text-red-400"></i>
              <button onClick={() => setShowModal(true)}> Buy </button>
              
               <i className="fas fa fa-circle text-[8px] pt-3 text-red-400"></i>
              <Link to="/blog">
                <h3> Blog </h3>
              </Link>
              {/* <i className="fas fa fa-circle text-[8px] pt-3 text-red-400"></i>
              <h3>
                <HashLink to='/#contact' >
                  Contact Us
                </HashLink>
              </h3>
            </div>
          
        </div>*/}
         <nav className='w-full flex lg:inline-flex items-center flex-wrap bg-[#FCF9EB] lg:px-6 pl-4 border-b-2 shadow-lg h-auto lg:h-auto'>
         <div className='w-96'>
          <Link to="/">
              <img className="w-40 h-36 mx-6 shawdow-lg" src={logo} alt="logo" />
            </Link>
          
            </div>
        <button
          className=' inline-flex p-3 rounded lg:hidden text-black ml-auto hover:text-black outline-none'
          onClick={handleClick}
        >
          <svg
            className='w-16 h-16 mr-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        
        <div className={`${ active ? '' : 'hidden'} w-full lg:w-1/2   lg:inline-flex lg:flex-grow shawdow-xl ml-0 lg:ml-24 `}>
            <div className=' lg:w-auto w-full  flex lg:flex-row flex-col  shawdow-xl    lg:h-auto '>
            <i className="hidden lg:block fas fa fa-circle text-[10px] pt-6 text-red-400 pr-2"></i>
            <Link to="/appointment">
                <h3 className='font-bold text-[16px] lg:text-[20px] py-3 px-4 hover:text-[#E94C60]'>
                    Book Consultation
                </h3>
              </Link>
              <i className="hidden lg:block fas fa fa-circle text-[10px] pt-6 text-red-400 pr-2"></i>
              <Link to="/"> <button  className='font-bold text-[16px] lg:text-[20px] py-3 px-4 hover:text-[#E94C60]' onClick={() => setShowModal(true)}> Buy </button>
              </Link>
              <i className="hidden lg:block fas fa fa-circle text-[10px] pt-6 text-red-400 pr-2"></i>
              <Link to="/blog">
                <h3  className='font-bold text-[16px] lg:text-[20px] py-3 px-4 hover:text-[#E94C60]'> Blog </h3>
             
              </Link>
             
              <i className="hidden lg:block fas fa fa-circle text-[10px] pt-6 text-red-400 pr-2"></i>
                <HashLink to='/about' >
                <h3  className='font-bold text-[16px] lg:text-[20px] py-3 px-4 hover:text-[#E94C60] '>About Us
                </h3> 
                </HashLink>
                <i className="hidden lg:block fas fa fa-circle text-[10px] pt-6 text-red-400 pr-2"></i>
                <HashLink to='/#contact' >
                <h3  className='font-bold text-[16px] lg:text-[20px] py-3 px-4 hover:text-[#E94C60] '>Contact Us
                </h3> 
                </HashLink>
             </div>
        </div>
    </nav>
      </header>
    </>
  );
}
export default Header;
