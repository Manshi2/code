import logo1 from "../photo/logo.png";
import { FiFacebook } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';
import { FiYoutube } from 'react-icons/fi';
import {Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  return (
    <>
      <footer>
        <div className='flex px-10 lg:px-20 pt-20 pb-20 gap-8 lg:gap-10'>
          <div className='w-[35rem] '>
            <img className="w-20 h-16 ml-4" src={logo1} alt="carenest logo" />
            <p className='pt-4 text-black text-md  text-justify' >CareNest is a digital multispecialty OPD that
provides you with products that have been
carefully reviewed for your optimal healthcare.
We believe that telehealth and advice can
change your outlook on living healthily and
your way of life!</p>
          </div>
          <div className=' pt-8 ml-4'>
            <h3 className='text-2xl font-bold '>Overview</h3>
            <p className='text-md pt-4'>Health</p>
            <p className='text-md pt-4'><Link to="/appointment" >Make a Schedule</Link></p>
          </div>
          <div className='pt-8' >
            <h3 className='text-2xl font-bold '>Company</h3>
            <p className='text-md pt-4'><Link to="/" >Home</Link></p>
            <p className='text-md pt-10 lg:pt-4 '><Link to="/about" >About</Link></p>
            <p className='text-md pt-10 lg:pt-4'><HashLink to="/#services" >Services</HashLink></p>
          </div>
          <div className='pt-8'>
            <h3 className='text-2xl font-bold '>Explore</h3>
            <p className='text-md pt-4'><Link to="/terms&conditions" >Terms and Conditions</Link></p>
            <p className='text-md pt-4'><Link to="/privacy" >Privacy Policies</Link></p>
            <p className='text-md pt-4'><Link to="/returnpolicy" >Return Policy </Link></p>
          </div>
          <div className='pt-8'>
            <h3 className='text-2xl font-bold pb-4 '>Social Media</h3>
            <div className="flex pb-4 gap-2">
              <a href="https://www.facebook.com/profile.php?id=100085891995908" target="_blank" rel="noreferrer" >
                <FiFacebook className="text-lg md:text-xl ml-3 mr-1" />
              </a>
              <a href=" https://www.instagram.com/carenest.in/" target="_blank" rel="noreferrer" >
                <FiInstagram className="text-lg md:text-xl mx-1" />
              </a>
              <a href="https://www.linkedin.com/company/carenest-india/" target="_blank" rel="noreferrer" >
                <FiLinkedin className="text-lg md:text-xl mx-1" />
              </a>
              <a href="https://www.youtube.com/channel/UCi6zEGrVo1GLbb2cSygglOA" target="_blank" rel="noreferrer" >
                <FiYoutube className="text-lg md:text-xl mx-1 " />
              </a>
            </div>
            <a href="mailto: contact@carenest.in" className='text-md font-semibold '>contact@carenest.in</a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer