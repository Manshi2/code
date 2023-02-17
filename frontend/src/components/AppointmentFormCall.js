import React, { useState, useCallback, useEffect } from 'react';
import {FcInfo} from 'react-icons/fc';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import '../styles/appointment.css';
import { ScheduleMeeting } from 'react-schedule-meeting';
import Modal from './modal';
import { toast } from 'react-toastify';
import {uploadFile, scheduleEvent} from '../lib/index';
import useRazorpay from "react-razorpay";
import {Link} from 'react-router-dom';
import moment from 'moment'
import {GiCheckMark} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const navigate = useNavigate();
    const [percentage, setPercentage] = useState();
    const [disabled, setDisabled] = useState(true);
    const [referdiv, setReferdiv] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [guardian, setGuardian] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [concern, setConcern] = useState("");
    const [userConcern, setUserConcern] = useState("");
    const [files, setFiles] = React.useState([]);
    const [video, setVideo] = useState(false);
    const [friendName, setFriendName] = useState("");
    const [friendNumber, setFriendNumber] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [eventInfo, setEventInfo] = useState("");
    const [newUser, setNewUser] = useState(true);
    const [step, setStep] = useState(1);
    const [showResponse, setShowResponse] = useState(false);
    const [parentsPerms, setParentsPerms] = useState(false)
    const Razorpay = useRazorpay();
    const steps = Array(4).fill(0);
    const [couponcode, setCouponcode] = useState("")
    const [coupondata, setCoupondata] = useState({})
    const [amount, setAmount] = useState()
    
    // ================================ { Update amount } ================================
    useEffect(() => {
      setAmount(() => {
        if(coupondata?.Amount || coupondata?.Amount === 0) return coupondata?.Amount
        return 199
      })
    }, [newUser, coupondata])

    // ================================ { Apply coupon } ================================
    const applycoupon = () => {
      fetch(process.env.REACT_APP_API_URL + '/api/apply_coupon', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          couponCode: couponcode,
          phone_number: phone,
          amount: '199',
          mode: 'Call'
        })
      })
      .then((res) => res.json())
      .then((json) => {
        if(!json.msg){
          setCoupondata(json)
        }else {
          window.alert(json?.msg || 'Coupon not valid or expired')
        }
      })
    }

    // ================================ { Funciton to handle time and date selection } ================================
    const handleTimeSelect = (e) => {
        setDateTime(e.startTime);
        setModalOpen(false);
        if(name && age && guardian && gender && phone && concern && eventInfo) setPercentage((100 / (steps.length - 1)) * 3)
        return
    }

    // ================================ { Handle form steps } ================================
    useEffect(() => {
      // if(!phone) setPercentage(undefined)
      // else if(!name || !dob || !guardian || !gender || !phone) setPercentage(undefined)
      // else if(!name || !dob || !guardian || !gender || !phone || !concern || !dateTime) setPercentage(undefined)
      const trueAge = ((age < 18 && guardian && parentsPerms) || age >= 18)
      if(phone && phone.length === 10) setPercentage(() => 1);
      if(name && dob && gender && phone && trueAge)  setPercentage(() => (100 / (steps.length - 1)) * 1)
      if(name && dob && trueAge && gender && phone && concern) setPercentage(() => (100 / (steps.length - 1)) * 2)
      if(name && dob && trueAge && gender && phone && concern && dateTime) setPercentage(() => (100 / (steps.length - 1)) * 3)
      
    }, [name, dob, age, guardian, gender, phone, concern, dateTime, parentsPerms, steps.length])

    // ================================ { Calculate age using DOB } ================================
    const calcAge = (dob) => {
      const y = moment().diff(dob, 'years'), 
        m = moment().diff(dob, 'months') % 12
      return parseFloat(`${y}.${m}`)
    }

    // ================================ { Auto update age when dob changes } ================================
    useEffect(() => {
      setAge(() => calcAge(dob))
    }, [dob])

    // ================================ { Function to handle Payment } ================================
    const handlePayment = useCallback(() => {

      return new Promise (async resolve => {
        try{
          if(parseFloat(amount) > 0){
            let orderDetails;
            if(!orderDetails){
              const res = await fetch(process.env.REACT_APP_API_URL + '/api/payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: Math.round(amount) + '00'})
              })
              if(res.status === 200) {
                orderDetails = await res.json()
              }else resolve({status: 'failed', msg: 'Failed to create order. Please contact support team.'})
            }

            const options = {
                key: process.env[process.env.NODE_ENV === 'development' ? 'REACT_APP_RAZORPAY_KEY_TEST' : 'REACT_APP_RAZORPAY_KEY_LIVE'], // Enter the Key ID generated from the Dashboard
                amount: orderDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: orderDetails.currency,
                order_id: orderDetails.id,
                name: "Carenest",
                description: `Carenest consultation fee`,
                image: "https://media-exp1.licdn.com/dms/image/C4D0BAQGeNPDTbHqUCA/company-logo_200_200/0/1662111313828?e=1674691200&v=beta&t=7qhyRH079b1jPwW4bm4NaY2ybvt-nefM04DnMzkuLy8",
                handler: function (response) {
                  if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
                    resolve({status: 'failed'})
                  } 
                  else {
                    resolve({status: 'successfull', data: orderDetails})
                  }
                },
                prefill: { name, email, contact: phone },
                // notes: {
                //   address: "Razorpay Corporate Office",
                // },
                theme: { color: "#E94C60", },
                modal: {
                  ondismiss: () => resolve({status: 'aborted', msg: 'Transaction aborted by user'})
                },
                send_sms_hash: true
            };

            const rzp1 = new Razorpay(options);
            rzp1.on("payment.failed", (response) => resolve({status: 'failed', response}));
            rzp1.open();
          }else{
            resolve({status: 'successfull', data: {id: null, receipt: null, amount: 0 }})
          }
        }catch(err){
          resolve({status: 'failed', err: err.message})
        }
      })
    }, [Razorpay, email, name, phone, newUser, video, amount]);
    
    // ================================ { Function to handle form submission } ================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, dob, guardian, gender, email, phone, concern, userConcern, friendName, friendNumber, video };
        const toastId = toast.loading('Processing...', {type: 'info', theme: 'colored'})
        
        if(!coupondata || coupondata === {}) return toast.update(toastId, {render: 'Kindly apply a coupon code to proceed.', type: 'error', isLoading: false, autoClose: 3000})

        if(!name || !dob || !gender || !phone || !concern || !dateTime || (age < 18 && !guardian) || !couponcode){
          return toast.update(toastId, {render: 'Please fill required fields.', type: 'error', isLoading: false, autoClose: 3000})
        }

        let payment;
        if(!(newUser && video)) {
          payment = await handlePayment();
          if(payment?.status === 'successfull') {
            toast.update(toastId, {render: 'Payment completed succsfully!', type: 'info'})
            data.order = {order_id: payment?.data?.id, receipt: payment?.data?.receipt, amount: payment?.data?.amount, coupon: couponcode, discount: coupondata?.value}
          }
          else {
            console.log(payment)
            return toast.update(toastId, {render: 'Failed to make payment', type: 'error', isLoading: false, autoClose: 3000})
          }
        }
        
        let attachments = [];
        if(files && files.length > 0){
            attachments = await uploadFile(files)
            if(attachments && attachments.length > 0) {
                attachments = attachments.map(({location, originalname, mimetype}) => ({fileUrl: location, title: originalname, mimeType: mimetype }))
                toast.update(toastId, {render: 'Files uploaded, processing...', type: 'info', theme: 'colored'})
            }
        }

        const event = await scheduleEvent({...data, dateTime, attachments});
        if(!event) {
            toast.update(toastId, {render: 'Failed to schedule event!', type: 'error', isLoading: false, autoClose: 3000})
            return
        }

        toast.update(toastId, {render: 'Event Scheduled sucessfully, processing...', type: 'info', theme: 'colored' });
        setEventInfo(event)
        
        data.event = {...event, attachments};

        fetch(process.env.REACT_APP_API_URL + "/api/appointment", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            res.text()
            toast.update(toastId, {render: 'Your consultation meeting with carenest is scheduled succesfully!', type: 'success', isLoading: false, autoClose: 3000})
            const vars = [ setName, setDob, setGuardian, setGender, setEmail, setPhone, setConcern, setUserConcern, setFriendName, 
              setFriendNumber, setFiles ]
            vars.forEach(func => func(() => ''))
            setShowResponse(() => true)
            // setTimeout(() => { 
            //   setDateTime(null); setEventInfo(null); setDisabled(true)
            // },3000)
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.update(toastId, {render: 'Failed to schedule meeting with carenest, please try again.', type: 'error', isLoading: false, autoClose: 3000})

        });
    };

    // ================================ { Check if user is present in DB or not } ================================
    const checkUserInDb = async (e) => {
      e.preventDefault()
      try{
          if(phone.length === 10){
            let res = await fetch(process.env.REACT_APP_API_URL + '/api/users?phone=' + phone, {
                'Content-Type': 'application/json'
            })
            res = await res.json()
            if(res?.users[0]){
                const {name, dob, guardian, gender, email} = res.users[0]
                const age = calcAge(dob)
                setName(() => name);
                setDob(() => dob);
                setGuardian(() => guardian);
                setGender(() => gender);
                setEmail(() => email);
                setNewUser(() => false);
                setStep((() => isNaN(age) || age < 18 ? 2 : 3))
              }else {
                setNewUser(() => true);
                setDisabled(() => false);
                setStep(() => 2)
              }
              setCoupondata(() => {})
              setCouponcode(() => "")
            }
          else {
            window.alert('Please enter a valid number')
          }
      }catch(err){
          console.log(err);
          window.alert('Failed to fetch..')
      }
    }
    
    // ================================ { Handle input change } ================================
    const handleInputChange = (e, callback, update) => {
      callback(() => e.target.value)
    }

    // ================================ { Function to copy event details to clipboard } ================================
    const copyEvent = () => {
      navigator?.clipboard.writeText(`Consultation meeting scheduled with Carenest!\n\nDate/Time: ${(new Date(eventInfo.startTime).toLocaleString())}\n\nMeeting Link: ${eventInfo?.meetingLink}`);
      window.alert("Event details copied to clipboard!")
    }
    
    const availableTimeslots = Array(25).fill(0).map((x, id) => {
    return {
        id,
        startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id + 1)).setHours(9, 0, 0, 0)),
        endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id + 1)).setHours(21, 0, 0, 0)),
    };
    });

    const inputClass = 'block w-full px-4 py-2 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none disabled:bg-gray-200/80';
    
    function renderStep () {
      switch(step) {
        case 1: return <div className='w-full'>
          <div className="flex flex-col items-center justify-center w-full mb-2">
            <label htmlFor="phone" className="font-bold text-gray-700 mb-7"> Phone Number </label>
            <input type="text" name="phone" id="phone" value={phone}
              onChange={(e) => handleInputChange(e, setPhone)} className={"lg:w-4/12 mb-7 " + inputClass} placeholder='Enter your phone number' required />
            <input type="button" onClick={(e) => checkUserInDb(e)} className="px-6 py-2 bg-[#9AB898] border-2 border-[#9AB898] disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded text-white font-bold" disabled={!phone || phone.length !== 10} value="Submit" />
          </div>
        </div> 
        // break;
        case 2: return <div className='w-full'>
          <div className="flex w-full space-x-10 mb-6">
            <div className="space-y-2 mb-2 w-1/2 ">
              <label htmlFor="name" className="font-bold text-gray-700"> Name </label>
              <input type="text" name="name" id="name" value={name} autoFocus={true}
                onChange={(e) => handleInputChange(e, setName)} className={"" + inputClass} disabled={disabled} placeholder='Enter your name' required />
            </div>
            <div className="space-y-2 mb-2 w-1/2 ">
              <label htmlFor="age" className="font-bold text-gray-700"> Date Of Birth 
                {age ? <small className='font-normal'> (Age: {age} years) </small> : null}
              </label>
              <input type="date" name="age" id="age"
                value={dob}
                onChange={(e) => handleInputChange(e, setDob)} className={inputClass} disabled={disabled} placeholder="Enter your age (Less than 18)" required />
              {
                parseInt(age) < 18 ? 
                  <div className="mb-4 mt-2 flex">
                    <input type="checkbox" checked={parentsPerms} onChange={() => setParentsPerms(() => !parentsPerms)} id='parentsConcern' className="form-check-input h-4 w-4 cursor-pointer mr-2 mt-1" />
                    <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="parentsConcern">
                      I've consent of my parents/guardians.  
                    </label>
                  </div> : null
              }
            </div>
          </div>
          <div className="flex w-full space-x-10 mb-6">
            {
              age && age < 18 ? <>
                <div className="space-y-2 mb-2 w-1/2">
                  <label htmlFor="guardian" className="font-bold text-gray-700"> Parents/Guardians Name </label>
                  <input type="text" name="guardian" id="guardian"
                    value={guardian}
                    onChange={(e) => handleInputChange(e, setGuardian)} className={inputClass} disabled={disabled} placeholder="Enter your parents name" required />
                </div>
              </> : null
            }
            <div className="space-y-2 mb-2 w-1/2">
              <label htmlFor="gender" className="font-bold text-gray-700"> Gender </label>
              <select name="gender" id="gender" disabled={disabled} 
                value={gender}
                onChange={(e) => handleInputChange(e, setGender)} className={inputClass} required>
                <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="">Select your gender</option>
                <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="male">Male</option>
                <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="female">Female</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2 mb-2 w-1/2 mx-auto">
            <label htmlFor="email" className="font-bold text-gray-700"> Email (Optional)</label>
            <input type="email" name="email" id="email" value={email}
              onChange={(e) => handleInputChange(e, setEmail)} className={inputClass} disabled={disabled} placeholder="Enter your email" />
          </div>
          <div className="max-w-max mx-auto space-x-7 flex items-center justify-center mt-8 mb-14">
            <input type="button" onClick={() => setStep(() => 1)} className="mx-auto px-6 py-2 border-2 border-[#9AB898] text-[#9AB898] disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded font-bold" 
            value="Back" />
            <input type="button" onClick={() => setStep(() => 3)} className="mx-auto px-6 py-2 bg-[#9AB898] border-2 border-[#9AB898] disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded text-white font-bold" 
            value="Submit" disabled={!name || !dob || !gender || !((age < 18 && guardian && parentsPerms) || age >= 18)} />
          </div>
        </div>
        break;
        case 3: return <div className='w-full'>
        <div className="flex lg:flex-row flex-col lg:space-x-10 w-full">
          <div className="w-full md:w-1/2">
            <div className="space-y-2 mb-2">
              <label htmlFor="concern" className="font-bold text-gray-700"> Select Your Concern </label>
              <select name="concern" id="concern" autoFocus={true}
                value={concern}
                onChange={(e) => handleInputChange(e, setConcern)} className={inputClass} required>
                <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="">Select your concern</option>
                {
                  ['Skin and hair', 'Mom and child health', 'General wellness', 'Nutrition', 'Medical reports opinion', 'Healthy living'].map((x, i) => (
                    <option key={'concern' + i} className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value={x}>{x}</option>
                  ))
                }</select>
            </div>
            <div className="space-y-2 mb-2 mt-4">
              <label htmlFor="files" className="font-bold text-gray-700 relative"> Upload images {['Skin and hair', 'Medical reports opinion'].includes(concern) ? '(Required)': '(Optional)'}
                <span className="absolute top-0 -right-7 cursor-pointer"><span title="You can select multiples here."><FcInfo size={20} /></span></span>
              </label>
              <input type="file" multiple={true} name="files" className={inputClass} onChange={(e) => handleInputChange({target: {value: e.target.files}}, setFiles)}
                required={['Skin and hair', 'Medical reports opinion'].includes(concern)}/>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="space-y-2 mb-2">
              <label htmlFor="userConcern" className="font-bold text-gray-700"> Type your concern here (Optional) </label>
              <textarea type="text" rows={5} value={userConcern} onChange={(e) => handleInputChange(e, setUserConcern)} className={inputClass} placeholder='Type your concern here' />
            </div>
          </div>
        </div>
        <div className="max-w-max mx-auto space-x-7 flex items-center justify-center mt-8 mb-14">
            <input type="button" onClick={() => setStep(() => 2)} className="mx-auto px-6 py-2 border-2 border-[#9AB898] text-[#9AB898] disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded font-bold" 
            value="Back" />
            <input type="button" onClick={() => setStep(() => 4)} className="mx-auto px-6 py-2 bg-[#9AB898] border-2 border-[#9AB898] disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded text-white font-bold" disabled={!name || !dob || !gender || !((age < 18 && guardian && parentsPerms) || age >= 18) || !concern || (['Skin and hair', 'Medical reports opinion'].includes(concern) && files?.length === 0)} value="Submit" />
          </div>
        </div>
        break;
        case 4: return <div className='w-full flex flex-col items-center justify-center'>
          <div className="flex space-x-10">
            <div className="space-y-2 mb-6">
              <h2 className="font-bold text-gray-700 relative mb-3 text-center"> Consultation Type </h2>
              <div className="w-full flex justify-center items-center">
                {/* <input type="radio" id="video" name="type" checked={video} className={'hidden'} />
                <label htmlFor="video" onClick={() => handleInputChange({target: {value: true}}, setVideo)} className="mx-auto font-bold text-gray-700 px-4 py-1 border rounded cursor-pointer"> Video </label> */}
                <input type="radio" id="call" name="type" checked={!video} className={' hidden'} />
                <label htmlFor="call" onClick={() => handleInputChange({target: {value: false}}, setVideo)} className="font-bold text-gray-700 px-4 py-1 border rounded cursor-pointer mx-3"> Call </label>
              </div>
            </div>

            <div className="text-center">
              <label htmlFor="phone" className="font-bold text-gray-700"> Pick a 20 minute time slot </label>
              {/* <div className="flex flex-col lg:flex-row spcace-x-4"> */}
                <div className="w-full felx items-center mt-3">
                  <input type="button" id="submitBtn" value="Select time" onClick={() => setModalOpen(true)} autoFocus={true}
                    className={'px-8 py-[6px] rounded-xl md:w-40 cursor-pointer bg-[#9AB898] border-2 border-[#9AB898] text-white font-semibold shadow-xl outline-none focus:border-2 focus:border-red-500'}
                  />
                  <p className="w-full mt-2"> {dateTime || eventInfo ? (new Date(eventInfo.startTime || dateTime).toLocaleString()) : 'Time not selected'} 
                  {
                    eventInfo ? 
                      <> <br /> {eventInfo ? <span> Meeting Link: {eventInfo?.meetingLink} </span> : null} </>
                      : null
                  }
                  </p>
                  <Modal modalOpen={modalOpen} setOpenModal={setModalOpen} >
                      <ScheduleMeeting
                        borderRadius={5}
                        primaryColor="#E94C60"
                        eventDurationInMinutes={20}
                        eventStartTimeSpreadInMinutes={10}
                        availableTimeslots={availableTimeslots}
                        lang_cancelButtonText="Cancel"
                        onStartTimeSelect={(e) => handleTimeSelect(e)}
                        defaultDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                      />
                  </Modal>
                </div>
              {/* </div> */}
            </div>

          </div>
          
          <div id="coupon-sec" style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"40px",gap:"20px"}}>
            <h3 style={{fontSize:"20px",fontWeight:"800"}}>Apply Coupon</h3>
            <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
              <input onChange={(e)=>setCouponcode(e.target.value)} value={couponcode} style={{outline:"none",border:"1px solid #E94C60",padding:"10px",width:"20vw","borderRadius":"10px"}} type="text" placeholder='Enter your coupon code here'/>
              <input type="button" className="px-7 py-2 bg-[#E94C60] rounded text-white font-bold cursor-pointer" onClick={applycoupon} value="Apply" />
            </div>
            <small className='-my-3'> {coupondata?.value ? <><span className='text-[#E94C60]'>{coupondata.code}</span> applied.</> : 'No coupon has been applied.'} </small>
            <h3 className="text-lg lg:-mt-2"> Amount: <span className="font-bold">{199}</span> | {coupondata && <>Discount: <span className="font-bold"> {coupondata.value || 0}{coupondata?.type === 'percentage' ? '%' : '' } </span></>} | Total: <span className="font-bold text-[#E94C60]">{Math.round(amount)}</span></h3>
          </div>
          <div className="w-full lg:w-1/2 mx-auto flex justify-center">
            <div className="">
              <p className="underline text-gray-700 font-bold text-lg mt-1 lg:mt-4 mb-3 cursor-pointer" onClick={() => setReferdiv(!referdiv)}>Refer a friend</p>
            </div>
            {
              referdiv ? 
                <div className={" space-y-2 mb-2 mx-auto py-4 px-4 rounded-lg w-60 h-44 relative shadow-lg " + (referdiv ? 'block' : 'hidden')}>
                  <p
                    className="absolute top-3 right-3 w-4 h-4 cursor-pointer rounded-full text-center shadow-lg shadow-slate-300 flex justify-center items-center"
                    onClick={() => setReferdiv(false)}
                  >
                    x
                  </p>

                  <div className="mb-2">
                    <label htmlFor="friendName" className="text-md font-bold text-gray-700"> Friend Name </label>
                    <input type="text" name="friendName" id="friendName" value={friendName}
                      onChange={(e) => handleInputChange(e, setFriendName)}
                      className={inputClass} placeholder="Enter your friend's name" />
                  </div>
                  <div className=" mb-2">
                    <label htmlFor="friendnumber" className="text-md font-bold text-gray-700"> Friend Phone Number </label>
                    <input type="tel" name="friendNumber" id="friendNumber"
                      value={friendNumber}
                      onChange={(e) => handleInputChange(e, setFriendNumber)} className={inputClass} placeholder="Enter your friend's number" />
                  </div>
              </div> : null
            }
          </div>

          <div className="mb-4 mt-5 flex">
            <input type="checkbox" required id='terms&conditionsconcern' value="" className="form-check-input h-4 w-4 cursor-pointer mr-2 mt-1" />
            <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="terms&conditionsconcern">
              I agree to <span className='text-blue-500 underline'>
                <Link Link to="/terms&conditions" target="_blank" rel="noopener noreferrer">terms and conditions. </Link>
              </span> 
            </label>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="max-w-max mx-auto mt-6 flex justify-center space-x-10">
              <input type="button" onClick={() => setStep(() => 3)} className="mx-auto px-6 py-2 border-2 border-[#9AB898] text-[#9AB898] disabled:bg-[#b6d8b5] cursor-pointer disabled:cursor-not-allowed rounded font-bold" 
              value="Back" />
              <button type='submit' className="px-7 py-2 bg-[#E94C60] rounded text-white font-bold">Submit</button>
            </div>
            {/* Hello */}
          </div>
        </div>
        break;
        default:
          <>

          </>
      }
    }

    return <>
        <div className="right w-10/12 lg:px-20 lg::w-6/12 px-3 mx-auto mt-10">
            <ProgressBar percent={percentage} filledBackground="#E94C60">
              {steps.map((x, i) => (
                <Step key={'step' + i} transition="scale">
                  {({ accomplished }) => <div onClick={() => setStep(() => i+1)}
                    className={`rounded-full w-10 h-10 flex justify-center items-center font-semibold cursor-pointer ${accomplished ? "bg-primary text-gray-200" : "bg-gray-300 text-gray-700"}`}
                  // onClick={() => handleStepClick(i)}
                  >
                    {i + 1}
                  </div>
                  }
                </Step>
              ))}
            </ProgressBar>

            <div className="mt-20">
              <form className="my-10 w-full" onSubmit={handleSubmit}>
                <div className=" md:min-h-[50vh]">
                  {
                    renderStep()
                  }
                </div>
                <Modal modalOpen={showResponse} setOpenModal={() => navigate("/")}>
                  <div className="flex flex-col items-center justify-center w-full lg:w-1/2 py-10 px-5 bg-white mx-auto relative">
                    <span onClick={() => {if(window.confirm('Have you saved event details?')) navigate("/")}} className="absolute right-3 top-3 cursor-pointer font-bold text-lg rounded-full border border-gray-600 w-6 h-6 flex items-center justify-center">x</span>
                    <GiCheckMark className='fill-green-500' size={50} />
                    <br />
                    <h3 className="text-lg"> Your appointment with <b className='text-[#E94C60]'>Carenest</b> is scheduled succesfully! </h3>
                    <br />
                    <span className="text-sm"><small>Click below link to copy:</small></span>
                    <h2 className="text-lg font-bold"> Meeting Link: 
                      <span className='text-blue-500 cursor-pointer' onClick={copyEvent}> {eventInfo?.meetingLink} </span>
                    </h2>
                    <span className="mt-2 text-sm font-semibold text-gray-600">NOTE: Save this link somewhere for future use. Do not lose it. </span>
                  </div>
                </Modal>
                
              </form>
            </div>
            <p className="text-sm -mt-5 font-bold md:w-2/4">
              Note: In case of any issue, mail us
              at contact@carenest.in 
              {/* /admin@carenest.in */}
            </p>
          </div>
    </>
}

export default AppointmentForm