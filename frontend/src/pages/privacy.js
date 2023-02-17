import React from "react"
import Footer from "../components/Footer";
import consent from "../photo/letter-of-consent.png"
import adv from "../photo/advertisement.png"
import Header from "../components/Header";
import files from "../photo/files.png"
import info from "../photo/info.png"
import people from "../photo/people.png"
import shield from "../photo/shield.png"
import cookie from "../photo/cookie.png"
import mark from "../photo/x-mark.png"
import block from "../photo/abc-block.png"
import collection from "../photo/collection.png"
import { MetaTags } from "react-meta-tags";
export default function privacy() {
  return (
    <>
     <MetaTags>
    <title>Main privacy of our visitors | CareNest</title>
      <meta name="description" content="This Privacy Policy document contains types of information that is collected and recorded by CareNest and how we use it." />
     
      
   
    </MetaTags>
    <div className="App ">
        <Header />
      
        <div className="text-black overflow-x-hidden bg-white px-10 pb-10 pt-14 lg:px-40">
          <h1 className="py-6 text-center text-7xl  font-bold md:py-10  ">
            <div className=" inline-block  text-[#E94C60]">
            Privacy Policy 
            </div>
          </h1>
          <p className="pt-20 pl-2 text-justify text-[18px]">
          At CareNest, accessible from CareNest.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CareNest and how we use it.
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in CareNest. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info/">Free Privacy Policy Generator</a>.
          </p>
          <div className="mt-20 inline-flex">
            <div className=" h-11 w-11 items-center  pt-2 text-center md:h-14 md:w-14">
              <img
                className="absolute"
                src={consent}
                width={32}
                height={34}
                alt="Consent - eveIT"
              />
            </div>

            <h2 className="pl-2 text-4xl font-bold">Consent</h2>
          </div>
          <p className="pt-10 pl-2 text-justify  text-[18px]">
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
          <div className="mt-20 inline-flex">
            <div className=" h-11 w-16 items-center  pt-2 text-center md:h-14 md:w-14">
              <img
                className="absolute "
                src={collection}
                width={32}
                height={34}
                alt="Information we collect - eveIT"
              />
            </div>

            <h2 className="pl-2 text-4xl font-bold">Information we collect</h2>
          </div>
          <p className="pt-10 pl-2 text-justify  text-[18px]">
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </p>
          <div className="mt-20 inline-flex">
            <div className=" h-12 w-20 items-center   pt-2 text-center md:h-14 md:w-14 ">
              <img  className="absolute " 
                      src={info} 
                      width={32} 
                      height={34}
                      alt="How eveIT use our information" />
            </div>

            <h2 className="pl-2 text-4xl font-bold">
              How we use our information
            </h2>
          </div>
          <p className="pt-10 pl-2 text-justify  text-[18px]">
            We use the information we collect in various ways, including to:
            <ul className="list-disc pl-14 pt-8">
              <li>Provide, operate, and maintain our website</li>
              <br />
              <li>Improve, personalize, and expand our website</li>
              <br />
              <li>Understand and analyze how you use our website</li>
              <br />
              <li>
                Develop new products, services, features, and functionality
              </li>
              <br />
              <li className="text-justify">
                Communicate with you, either directly or through one of our
                partners,
                <br /> including for customer service, to provide you with
                updates and other
                <br /> information relating to the website, and for marketing
                and promotional
                <br /> purposes
              </li>
              <br />
              <li>Send you emails</li>
              <br />
              <li>Find and prevent fraud</li>
            </ul>
          </p>
          <div className="mt-20 inline-flex">
            <div className=" h-11 w-11 items-center  pt-2 text-center md:h-14 md:w-14">
              <img  className="absolute " 
                      src={files} 
                      width={32} 
                      height={34}
                      alt="Log Files - eveIT" />
            </div>

            <h2 className="mb-8 pl-2 text-4xl font-bold">Log Files</h2>
          </div>
          <div className="pl-2  text-justify  text-[18px]">
            <p>
            CareNest follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. </p>
          </div>
          <div className="mt-20 inline-flex">
            <div className=" h-11 w-16 items-center  px-2 pt-2 text-center md:h-14 md:w-14">
              <img
                className="absolute "
                src={cookie}
                width={32}
                height={34}
                alt="Cookies and Web Beacons - eveIT"
              />
            </div>

            <h2 className="pl-2 text-4xl font-bold">Cookies and Web Beacons</h2>
          </div>
          <div className="pt-10 pl-2 text-justify  text-[18px]">
            <p>
            Like any other website, CareNest uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            
            </p>
          </div>
   
          <div className="mt-20 inline-flex">
            <div className=" h-11 w-20 items-center  px-2 pt-2 text-center md:h-14 md:w-14">
              <img  className="absolute " 
                      src={adv} 
                      width={32} 
                      height={34}
                      alt="Advertising Partners Privacy Policies - eveIT" />
            </div>

            <h2 className="pl-2 text-4xl font-bold">
              Advertising Partners Privacy Policies
            </h2>
          </div>
          <div className="pt-10 pl-2 text-justify  text-[18px]">
            <p>
            You may consult this list to find the Privacy Policy for each of the advertising partners of CareNest.
              <br /> <br />
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on CareNest, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              <br />
              <br />
              Note that CareNest has no access to or control over these cookies
              that are used by third-party advertisers.
            </p>
          </div>
          <div className="mt-20 inline-flex">
            <div className=" h-10 w-16 items-center rounded-full  bg-white px-2 pt-2 text-center md:h-14 md:w-14">
              <img
                className="absolute "
                src={people}
                width={32}
                height={34}
                alt="Third Party Privacy Policies - eveIT"
              />
            </div>

            <h2 className="pl-2 text-4xl font-bold">
              Third Party Privacy Policies
            </h2>
          </div>
          <div className="pt-10 pl-2 text-justify  text-[18px]">
            <p>
            CareNest's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              <br />
              <br />
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
            </p>
          </div>
          <div className="mt-20 inline-flex">
            <div className=" h-10 w-24 items-center  px-2 pt-2 text-center md:h-14 md:w-14">
              <img  className="absolute " 
                      src={mark} 
                      width={32} 
                      height={34}
                      alt="CCPA Privacy Rights - eveIT" />
            </div>

            <h2 className="pl-2 text-4xl font-bold">
              CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
          </div>
          <div className="pt-10 pl-2 text-justify  text-[18px]">
            <p>
              Under the CCPA, among other rights, California consumers have the
              right to:
              <br />
              <br />
              <ul className="list-disc pl-14">
                <li>
                  Request that a business that collects a consumer's personal
                  data disclose the categories and specific pieces of personal
                  data that a business has collected about consumers.
                  <br />
                  <br />
                </li>
                <li>
                  Request that a business delete any personal data about the
                  consumer that a business has collected.
                  <br />
                  <br />
                </li>
                <li>
                  Request that a business that sells a consumer's personal data,
                  not sell the consumer's personal data.
                  <br />
                  <br />
                </li>
                <li>
                  If you make a request, we have one month to respond to you. If
                  you would like to exercise any of these rights, please contact
                  us.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-20 inline-flex">
            <div className=" h-12 w-24 items-center  pt-2 text-center md:h-14 md:w-14">
              <img
                className="absolute "
                src={shield}
                width={32}
                height={34}
                alt="GDPR Data Protection Rights - eveIT"
              />
            </div>

            <h2 className="pl-2 text-4xl font-bold">
              GDPR Data Protection Rights
            </h2>
          </div>
          <div className="pt-10 pl-2 text-justify  text-[18px] ">
            <p>
              We would like to make sure you are fully aware of all of your data
              protection rights. Every user is entitled to the following:
              <br />
              <br />
              <h3 className="inline-flex font-bold  text-[#E94C60]">
                The right to access
              </h3>{" "}
              – You have the right to request copies of your personal data. We
              may charge you a small fee for this service.
              <br />
              <h3 className="inline-flex font-bold  text-[#E94C60]">
                The right to rectification
              </h3>{" "}
              – You have the right to request that we correct any information
              you believe is inaccurate. You also have the right to request that
              we complete the information you believe is incomplete.
              <br />
              <h3 className="inline-flex font-bold  text-[#E94C60]">
                The right to erasure
              </h3>{" "}
              – You have the right to request that we erase your personal data,
              under certain conditions.
              <br />
              <h3 className="inline-flex font-bold  text-[#E94C60]">
                The right to restrict processing
              </h3>{" "}
              – You have the right to request that we restrict the processing of
              your personal data, under certain conditions.
              <br />
              <h3 className="inline-flex font-bold  text-[#E94C60]">
                The right to object to processing
              </h3>{" "}
              – You have the right to object to our processing of your personal
              data, under certain conditions.
              <br />
              <h3 className="inline-flex font-bold  text-[#E94C60]">
                The right to data portability
              </h3>{" "}
              – You have the right to request that we transfer the data that we
              have collected to another organization, or directly to you, under
              certain conditions.
              <br />
              <br />
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </p>
          </div>

          <div className="mt-20 inline-flex">
            <div className=" h-10 w-16 items-center  pt-2 text-center md:h-14 md:w-14">
              <img  className="absolute " 
                      src={block} 
                      width={32} 
                      height={34}
                      alt="Children's Information - eveIT" />
            </div>

            <h2 className="pl-2 text-4xl font-bold">Children's Information</h2>
          </div>
          <div className="pt-10 pl-2 text-justify  text-[18px]">
            <p>
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity.
              <br />
              <br />
              CareNest does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records. 
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
