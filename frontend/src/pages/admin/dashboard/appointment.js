import React, { useState, useEffect, useRef } from "react";
import Layout from "./layout";
import moment from "moment";
import { FiEdit, FiCalendar } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import DatePicker from "../../../components/DateRange";
import Modal from "../../../components/modal";
import {downloadCsv} from '../../../lib'
import {Link} from 'react-router-dom'
import UserImages from '../../../components/UserImages'

const calcAge = (dob) => {
  const y = moment().diff(dob, "years"),
    m = moment().diff(dob, "months") % 12;
  return parseFloat(`${y}.${m}`);
};

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const input = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [range, setRange] = useState([]);
  const [concern, setConcern] = useState("");
  
  const fetchData = (search = "") => {
    fetch(
      process.env.REACT_APP_API_URL + `/api/admin/appointment?search=${search}&${
        range && range.length > 0
          ? `startDate=${range[0]?.startDate?.toISOString()}&endDate=${range[0]?.endDate?.toISOString()}`
          : ""
      }&all=${showAll}&concern=${concern}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.appointments) setAppointments(() => data.appointments);
        return;
      });
  };

  const handleSearch = () => fetchData(input?.current.value);

  useEffect(() => {
    setRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [showAll, range, concern]);

  const handleRangeChange = (item) => {
    setRange(() => [item.selection]);
    setShowAll(() => false);
  };

  const handleChange = (e) => {
    if (e.target.value === "") fetchData();
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter" && input.current.value !== "") {
      handleSearch();
    }
  };

  const downloadAsCsv = () => {
    downloadCsv(
      appointments.map(x => ({time: new Date(x.event.startTime)?.toLocaleString(), name: x.name, phone: x.phone, age: x.age, email: x.email, concern: x.concern, meet: x.event.meetingLink})),
      ['time', 'name', 'phone', 'age', 'email', 'concern', 'meet'],
      `appointments${showAll ? '' : ` ${range[0]?.startDate.toLocaleDateString("IN")} - ${range[0]?.endDate.toLocaleDateString("IN")}`}`,
    )
  }

  return (
    <Layout>
      <div className="flex w-full justify-around">
        <div className="w-[27%] mr-0 flex">
          <input
            type="text"
            ref={input}
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => handleKeypress(e)}
            placeholder="&#128269; Search by name, phone, email, etc."
            className="w-full h-10 outline-none rounded rounded-r-none px-2 py-2 text-black border-2 border-[#E94C60]"
          />
        
            <button
              className="outline-none bg-[#E94C60] rounded rounded-l-none  w-[20%] h-10  text-white font-bold"
              onClick={handleSearch}
            >
              Go
            </button>
       
        </div>
        
        <div className="w-[28%] mr-3">
          <div className="w-full flex justify-between">
            <button
              className="outline-none bg-white py-[6px] rounded w-[67%] px-2 text-black border-2 border-[#E94C60] cursor-pointer flex justify-between items-center"
              onClick={() => setModalOpen(true)}
            >
              {range[0]?.startDate.toLocaleDateString("IN")} - 
              {range[0]?.endDate.toLocaleDateString("IN")}
              <FiCalendar className="ml-2 text-[#E94C60]" />
            </button>
            <button
              className={
                "font-bold outline-none py-[6px] rounded w-[30%] px-2 border-2 border-[#E94C60] cursor-pointer flex justify-between items-center " +
                (showAll ? "bg-[#E94C60] text-white" : "bg-white text-black")
              }
              onClick={() => setShowAll(() => !showAll)}
            >
              Show All
            </button>
          </div>
          <Modal modalOpen={modalOpen} setOpenModal={setModalOpen}>
            <center className="w-full">
              <DatePicker range={range} handleChange={handleRangeChange} />{" "}
            </center>
          </Modal>
        </div>
        <div className="w-[21%] mr-0">
        <button className="outline-none bg-[#E94C60] rounded w-[90%] py-[6.5px] text-white font-semibold cursor-pointer" >
        <select
                name="concern"
                id="concern"
                className="outline-none bg-[#E94C60] rounded w-[100%] py-[4px] text-white px-2 cursor-pointer"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                
                required
              >
                <option
                  className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 "
                  value="" 
                >
                  Select your concern
                </option>
                {[
                  "Skin and hair",
                  "Mom and child health",
                  "General wellness",
                  "Nutrition",
                  "Medical reports opinion",
                  "Healthy living",
                ].map((x, i) => (
                  <option
                    key={"concern" + i}
                    className="px-4 py-2 border border-gray-300 transition duration-300 text-white"
                    value={x} 
                  >
                    {x}
                  </option>
                ))}
                </select>
            </button>
        </div>
        <div className="w-[20%]">
          <center className="w-full">
            <button className="outline-none bg-[#E94C60] rounded w-[90%] py-[7.5px] text-white font-bold" onClick={() => downloadAsCsv()}>
              Download as CSV
            </button>
          </center>
        </div>
      </div>
      <div className="block w-full overflow-x-auto mt-5 shadow">
        <table className="items-center bg-transparent w-full border-collapse shadow">
          <thead className="bg-[#9AB898] shadow">
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Date-Time
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Name
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Phone
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Age
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Email
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Concern
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Images
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Meet
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Prescription
              </th>
            </tr>
          </thead>
          <tbody className="shadow">
            {appointments.map((appointment, i) => (
              <>
                <tr key={"row-" + i}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {new Date(appointment.event.startTime)?.toLocaleString()}
                  </th>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    <Link to={`/admin/dashboard/user/${appointment.phone}`}> {appointment.name} </Link>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    <Link to={`/admin/dashboard/user/${appointment.phone}`}> {appointment.phone} </Link>
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {calcAge(appointment.dob) || appointment.dob}
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3">
                    {appointment.email}
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 ">
                    {appointment.concern}
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 ">
                    <UserImages images={appointment.event.attachments} />
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 ">
                    <center>
                      <a
                        href={appointment.event.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <FaExternalLinkAlt size={16} />{" "}
                      </a>
                    </center>
                  </td>
                  <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 truncate max-w-full">
                    <center>
                      <Link to={`/admin/dashboard/prescription?patientPhone=${appointment.phone}&concern=${appointment.concern}`}>
                        <FiEdit size={16} />{" "}
                      </Link>
                    </center>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Appointment;