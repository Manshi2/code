import React , {useState, useEffect, useRef} from 'react'
import Layout from './layout'
import moment from "moment"
import {useAuthorization} from '../../../lib/auth'
import { useParams, Link } from 'react-router-dom'
import { FiEdit, FiDownload } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import PrescriptionPdf from '../../../components/PrescriptionPdf'
import UserImages from '../../../components/UserImages'

const calcAge = (dob) => {
    const y = moment().diff(dob, "years"),
      m = moment().diff(dob, "months") % 12;
    return parseFloat(`${y}.${m}`);
};

const UserProfile = (props) => {
    const {phone} = useParams()
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [patient, setPatient] = useState([]);
    const auth = useAuthorization()

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/api/admin/users?search=${phone}`)
        .then((res) => res.json())
        .then((data) => {
            if (data?.users) setPatient(() => data.users[0]);
            return;
        });
    }, [])

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/api/admin/prescription?doctorId=${auth?.user?.id || ""}&patientPhone=${phone}`)
        .then((res) => res.json())
        .then((data) => {
            if (data?.prescriptions) setPrescriptions(() => data.prescriptions);
            return;
        });
    }, [])

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/api/admin/appointment?search=${phone}&all=true`)
        .then((res) => res.json())
        .then((data) => {
            if (data?.appointments) setAppointments(() => data.appointments);
            return;
        });
    }, [])

    return (
    <Layout>
        <h2 className="text-xl text-center font-semibold text-[#E94C60] mb-8">Patient Details</h2>
        <div className="w-full flex items-center justify-center flex-wrap px-8">
            <div className="w-full lg:w-1/2 my-1">
                <h2 className=""><span className="text-lg font-semibold mr-3">Name: </span>{patient.name || ""}</h2>
            </div>
            <div className="w-full lg:w-1/2 my-1">
                <h2 className=""><span className="text-lg font-semibold mr-3">Phone: </span>{patient.phone || ""}</h2>
            </div>
            <div className="w-full lg:w-1/2 my-1">
                <h2 className=""><span className="text-lg font-semibold mr-3">Email: </span>{patient.email || ""}</h2>
            </div>
            <div className="w-full lg:w-1/2 my-1">
                <h2 className=""><span className="text-lg font-semibold mr-3">Age: </span> {calcAge(patient.dob) || ""}</h2>
            </div>
            <div className="w-full lg:w-1/2 my-1">
                <h2 className=""><span className="text-lg font-semibold mr-3 capitalize">Gender:</span> {patient.gender || ""}</h2>
            </div>
            <div className="w-full lg:w-1/2 my-1">
                <h2 className=""><span className="text-lg font-semibold mr-3">Guardian: </span> {patient.guardian || "---"}</h2>
            </div>
        </div>

        {/* =============================== Appointments =============================== */}
        <h2 className="text-xl text-center font-semibold text-[#E94C60] mt-10">Past Appointments</h2>
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
                    Meet
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Images
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
                        {appointment.name}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {appointment.phone}
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
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 ">
                        <UserImages images={appointment.event.attachments} />
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

        {/* =============================== Prescriptions =============================== */}
        <h2 className="text-xl text-center font-semibold text-[#E94C60] mt-10">Past Prescriptions</h2>
        <div className="block w-full overflow-x-auto mt-5 shadow mb-14">
            <table className="items-center bg-transparent w-full border-collapse shadow">
            <thead className="bg-[#9AB898] shadow">
                <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Date-Time
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Patient Phone
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Concern
                    </th>
                    <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Download
                    </th>
                </tr>
            </thead>
            <tbody className="shadow">
                {prescriptions.map((prescription, i) => (
                <>
                    <tr key={"row-" + i}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {new Date(prescription.created)?.toLocaleString()}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {prescription.patientPhone}
                        </td>
                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 ">
                            {prescription.concern}
                        </td>
                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3">
                            <PrescriptionPdf prescription={prescription} />
                        </td>
                    </tr>
                </>
                ))}
            </tbody>
            </table>
        </div>

    </Layout>
    )
}

export default UserProfile