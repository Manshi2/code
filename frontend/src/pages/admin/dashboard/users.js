import React , {useState, useEffect, useRef} from 'react'
import Layout from './layout'
import moment from 'moment'
import {FiCalendar} from 'react-icons/fi'
import DatePicker from '../../../components/DateRange'
import Modal from '../../../components/modal'
import {downloadCsv} from '../../../lib'
import {Link} from 'react-router-dom'

const calcAge = (dob) => {
  const y = moment().diff(dob, 'years'), 
    m = moment().diff(dob, 'months') % 12
  return parseFloat(`${y}.${m}`)
}

const Users = () => {
  const [users, setUsers] = useState([])
  const input = useRef()
  const [modalOpen, setModalOpen] = useState(false)
  const [showAll, setShowAll] = useState(true)
  const [range, setRange] = useState([])

  const fetchData = (search = '') => {
    fetch(process.env.REACT_APP_API_URL + `/api/admin/users?search=${search}&${range && range.length > 0 ? `startDate=${range[0]?.startDate?.toISOString()}&endDate=${range[0]?.endDate?.toISOString()}` : ''}&all=${showAll}`)
    .then(res => res.json())
    .then(data => {
      if(data?.users) setUsers(() => data.users)
      return
    })
  }

  const handleSearch = () => fetchData(input?.current.value)
  
  useEffect(() => {
    setRange([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }])
  }, [])

  useEffect(() => {
    fetchData()
  }, [showAll, range])

  const handleRangeChange = (item) => {
    setRange(() => [item.selection])
    setShowAll(() => false)
  }

  const handleChange = (e) => {
    if(e.target.value === '') fetchData()
  }
  
  const handleKeypress = (e) => {
    if (e.key === 'Enter' && input.current.value !== '') {
      handleSearch()
    }
  }

  const downloadAsCsv = () => {
    downloadCsv(
      users.map(x => ({name: x.name, phone: x.phone, dob: x.dob, email: x.email, gender: x.gender, guardian: x. guardian})),
      ['name', 'phone', 'dob', 'email', 'gender', 'guardian'],
      `users${showAll ? '' : ` ${range[0]?.startDate.toLocaleDateString("IN")} - ${range[0]?.endDate.toLocaleDateString("IN")}`}`,
    )
  }

  return (
    <Layout>
        <div className="flex w-full justify-around">
          <div className="w-[27%] mr-0">
            <input type="text" ref={input} onChange={(e) => handleChange(e)} onKeyPress={(e) => handleKeypress(e)} placeholder='&#128269; Search by name, phone, email, etc.' className='w-full h-10 outline-none rounded px-2 text-black border-2 border-[#E94C60]' />
          </div> 
          <div className="w-[18%]">
            <center className="w-full">
              <button className="outline-none bg-[#E94C60] rounded w-[90%] py-[7.5px] text-white font-bold" onClick={handleSearch}> Search </button>
            </center>
          </div>
          <div className="w-[28%]">
              <div className="w-full flex justify-between">
                <button className="outline-none bg-white py-[6px] rounded w-[67%] px-2 text-black border-2 border-[#E94C60] cursor-pointer flex justify-between items-center" onClick={() => setModalOpen(true)}> 
                  {range[0]?.startDate.toLocaleDateString('IN')} - {range[0]?.endDate.toLocaleDateString('IN')}
                  <FiCalendar className="ml-2 text-[#E94C60]" />
                </button>
                <button className={"font-bold outline-none py-[6px] rounded w-[30%] px-2 border-2 border-[#E94C60] cursor-pointer flex justify-between items-center " + (showAll ? 'bg-[#E94C60] text-white' : 'bg-white text-black')} onClick={() => setShowAll(() => !showAll)}> 
                  Show All
                </button>
              </div>
            <Modal modalOpen={modalOpen} setOpenModal={setModalOpen}>
              <center className="w-full"> <DatePicker range={range} handleChange={handleRangeChange} /> </center>
            </Modal>
          </div>
          
          <div className="w-[23%]">
            <center className="w-full">
              <button className="outline-none bg-[#E94C60] rounded w-[90%] py-[7.5px] text-white font-bold" onClick={() => downloadAsCsv()}> Download as CSV</button>
            </center>
          </div>
        </div>
        <div className="block w-full overflow-x-auto mt-5 shadow">
          <table className="items-center bg-transparent w-full border-collapse shadow">
            <thead className="bg-[#9AB898] shadow">
              <tr>
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
                  Gender
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Guardain
                </th>
              </tr>
            </thead>
            <tbody className="shadow">
              {
                users.map((users, i) => <>
                  <tr key={"row-" + i}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      <Link to={`/admin/dashboard/user/${users.phone}`}> {users.name} </Link>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      <Link to={`/admin/dashboard/user/${users.phone}`}> {users.phone} </Link>
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {calcAge(users.dob) || users.dob || users.age}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {users.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {users.gender}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {users.guardian || '- - -'}
                    </td>
                  </tr>
                </>
                )
              }
            </tbody>
          </table>
        </div>
    </Layout>
  )
}

export default Users
