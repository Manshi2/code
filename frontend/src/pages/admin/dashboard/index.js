import React, { useEffect, useState } from 'react'
import Layout from './layout'
import { Link } from 'react-router-dom'
import appointment_img from '../../../photo/appointments.png'
import {FiUsers} from 'react-icons/fi'
import {MdContactSupport} from 'react-icons/md'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/admin/stats')
    .then(res => res.json())
    .then(data => {
      setStats(() => data)
    })
  }, [])

  return (
    <Layout>
      <h2 className="text-4xl text-[#E94C60] text-center font-bold mb-10 mt-10"> Statistics </h2>
      <div className="w-full flex flex-wrap">
        <Link to='/admin/dashboard/appointment' className="w-full h-max lg:w-3/12 rounded-lg shadow-lg px-6 py-5 text-[#E94C60] mx-6">
          <div >
            <div className="flex justify-start items-center">
              <img className="mb-4" src={appointment_img} width="40px" />
              <h2 className="text-xl font-semibold mb-5">Appointments</h2>
            </div>
            <h3 className="text-2xl font-bold ml-3"> {stats?.appointments} </h3>
          </div>
        </Link>
        <Link to='/admin/dashboard/contact' className="w-full h-max lg:w-3/12 rounded-lg shadow-lg px-6 py-5 text-[#E94C60] mx-6">
          <div >
            <div className="flex justify-start items-center">
              <MdContactSupport size={30} className="mb-7 mr-3 text-black" />
              <h2 className="text-xl font-semibold mb-5">Contact Requests</h2>
            </div>
            <h3 className="text-2xl font-bold ml-3"> {stats?.contacts} </h3>
          </div>
        </Link>
        <Link to='/admin/dashboard/users' className="w-full h-max lg:w-3/12 rounded-lg shadow-lg px-6 py-5 text-[#E94C60] mx-6">
          <div >
            <div className="flex justify-start items-center">
              <FiUsers size={30} className="mb-7 mr-3 text-black" />
              <h2 className="text-xl font-semibold mb-5">Users</h2>
            </div>
            <h3 className="text-2xl font-bold ml-3"> {stats?.users} </h3>
          </div>
        </Link>
      </div>      
    </Layout>
  )
}

export default Dashboard
