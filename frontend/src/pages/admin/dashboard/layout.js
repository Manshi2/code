import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../photo/logo-removebg-preview.png'
import {useAuthorization} from '../../../lib/auth'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Layout({children}) {
    const location = useLocation()
    const auth = useAuthorization()

    useEffect(() => {
        auth.validate()
    }, [])
    
    return (
    <div className="App overflow-x-hidden">
        {/* <Header /> */}
        <div className='flex px-5 w-full'>
            <div className='w-[20%] h-screen rounded-lg py-10'>
                <ul className="w-full h-[95%] relative border-[#E94C60]/20 border-2 shadow-lg shadow-[#E94C60]/20 rounded-lg px-6 pt-2">
                    <Link to="/admin/dashboard">
                        <h1 className='text-2xl text-[#E94C60] font-bold'>
                            DASHBOARD
                        </h1>
                    </Link>
                    <Link to="/admin/dashboard/appointment">
                        <li className={"cursor-pointer w-[100%] border-2 borrder-[#E94C60] text-md font-semibold text-center py-2 px-4 rounded-lg my-8 " + (location.pathname.includes('/appointment') ? 'bg-[#E94C60] text-white' : '' )}>Appointments</li>
                    </Link>
                    <Link to="/admin/dashboard/contact">
                        <li className={"cursor-pointer w-[100%] border-2 borrder-[#E94C60] text-md font-semibold text-center py-2 px-4 rounded-lg my-8 " + (location.pathname.includes('/contact') ? 'bg-[#E94C60] text-white' : '' )}>Contact Requests</li>
                    </Link>
                    <Link to="/admin/dashboard/users">
                        <li className={"cursor-pointer w-[100%] border-2 borrder-[#E94C60] text-md font-semibold text-center py-2 px-4 rounded-lg my-8 " + (location.pathname.includes('/users') ? 'bg-[#E94C60] text-white' : '' )}>Users</li>
                    </Link>
                    <Link to="/admin/dashboard/prescription">
                        <li className={"cursor-pointer w-[100%] border-2 borrder-[#E94C60] text-md font-semibold text-center py-2 px-4 rounded-lg my-8 " + (location.pathname.includes('/prescription') ? 'bg-[#E94C60] text-white' : '' )}>Create Prescription</li>
                    </Link>
                    <li onClick={() => auth.logout()} className="cursor-pointer w-[100%] border-2 borrder-[#E94C60] text-md font-semibold text-center py-2 px-4 rounded-lg absolute bottom-0 left-0">Logout</li>
                    
                </ul>
            </div>
            <div className="w-[77%] ml-10 pt-5">
                <img src={logo} alt="Logo" width={120} height={120} className="mx-auto mb-5" />
                {children}
            </div>
        </div>
        {/* <Footer /> */}
    </div>
    )
}

export default Layout