import React, { useRef, useState } from "react"
import ReactToPrint from "react-to-print"
import logo from "../photo/logo-removebg-preview.png"
import moment from "moment"
import { FiDownload } from "react-icons/fi"
import {Link} from 'react-router-dom' 

const calcAge = (dob) => {
    const y = moment().diff(dob, "years"),
      m = moment().diff(dob, "months") % 12;
      return parseFloat(`${y}.${m}`);
};
  
const PrescriptionPdf = ({ prescription }) => {
    const [doctor, setDoctor] = useState({})
    const [patient, setPatient] = useState({})
    const componentRef = useRef()
    const btnRef = useRef()

    const fetchDoctorDetails = () => {
        return new Promise((resolve) => {
            fetch(process.env.REACT_APP_API_URL + `/api/admin/doctors?id=${prescription.doctorId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.doctors) {
                    setDoctor(() => data?.doctors[0]);
                }
                resolve()
            });
        })
    }

    const fetchPatientDetails = () => {
        return new Promise((resolve) => {
            fetch(process.env.REACT_APP_API_URL + `/api/admin/users?search=${prescription.patientPhone}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.users) {
                    setPatient(() => data?.users[0]);
                }
                resolve()
            });
        })    
    }

    const handlePrint = async () => {
        await Promise.all([fetchDoctorDetails, fetchPatientDetails].map(async func => await func()))
        await new Promise(res => setTimeout(res, 500))
        btnRef.current?.click()
    }

    return (
    <>
      <span onClick={handlePrint} className='ml-8 cursor-pointer'> <FiDownload className='ml-8' size={20} /> </span>
      <ReactToPrint
        trigger={() => (
          <div 
            style={{display: 'none'}}
            ref={btnRef}
            className="bg-[#E94C60] w-52 h-12 text-center text-white rounded-md ml-6 cursor-pointer flex justify-center items-center"
          >
            <button>Print</button>
          </div>
        )}
        content={() => componentRef.current}
      />

      <div style={{ display: "none" }}>
      <div ref={componentRef} className="p-5 mx-20">
                  <h1 className="text-center p-2 text-2xl bg-[#E94C60] text-white">
                    <span className="">Prescription</span>
                  </h1>
                  <div className="flex items-center justify-center w-full  pt-6">
                    <Link to="/">
                      <img
                        className="w-20 h-16 mx-6 shawdow-lg"
                        src={logo}
                        alt="logo"
                      />
                    </Link>
                  </div>

          <div className="w-full">
            <div>
              <p className="text-sm text-right">Date: {prescription?.date}</p>
              <div className="w-full flex gap-16 pt-10">
                <div className="w-1/2">
                  <p className="text-sm">Patient Name: {patient?.name}</p>
                  <p className="text-sm">
                    {patient?.gender ? <> Gender: {patient?.gender[0]?.toUpperCase() + patient?.gender?.substring(1)} </> : ""}
                  </p>
                  <p className="text-sm">Age: {calcAge(patient?.dob)}</p>
            
                  <p className="text-sm">Phone Number: {patient?.phone}</p>
                
                </div>
                <div className="w-1/2 text-left ">
                <p className="text-sm">CareNest</p>
                  <p className="text-sm">Doctor Name: {doctor?.name}</p>
             
                  <p className="text-sm">Reg. Number: {doctor?.regNumber}</p>
                </div>
              </div>
            </div>
            <p className="text-md">Probable Diagnosis: {prescription?.concern}</p>
          </div>

          <div className="mt-20">
            <table width="100%" className="mb-10">
              <thead>
              <tr className="bg-[#E94C60] text-[14px] md:text-[18px] text-white">
                          <td className="font-semibold text-center p-2 ">
                             Name of Med.
                          </td>
                          <td className="font-semibold text-center p-2">Frequency</td>
                          <td className="font-semibold text-center p-2">Route of Administration</td>
                          <td className="font-semibold text-center p-2">No. of Days</td>
                       
                          <td className="font-semibold text-center p-2">
                            Comments
                          </td>
               </tr>
              </thead>
              {prescription?.medicines?.map(
                ({ id, medicine_name, Nop, roa, duration, comment }) => (
                  <React.Fragment key={id}>
                    <tbody> 
                      <tr className="h-10 border-black border-2 text-black text-[10px] md:text-sm">
                        <td className="pl-6">{medicine_name}</td>
                        <td className="pl-6">{Nop}</td>
                        <td className="pl-6">{roa}</td>
                        <td className="pl-6">{duration}</td>
                       
                        <td className="pl-6">{comment}</td>
                      </tr>
                    </tbody>
                  </React.Fragment>
                )
              )}
            </table>
          </div>
          <div className=" mt-20 ">
            <div className="mt-16">
                {prescription?.note ? 
                    <p className="text-[10px] md:text-[16px]">
                      <span className="text-2xl font-bold pr-4">Notes:</span> {prescription?.note} 
                    </p>
                    : ""
                }
            </div>
          </div>

          <div className="mt-40">
            <h1 className="text-center text-2xl">
              Powered By
              <span className="text-[#E94C60] font-bold">EveIt</span>{" "}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionPdf;
