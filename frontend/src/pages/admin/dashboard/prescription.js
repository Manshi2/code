import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import Header from "../../../components/Header";
import Layout from "./layout";
import Footer from "../../../components/Footer";
import logo from "../../../photo/logo-removebg-preview.png";
import { Link } from "react-router-dom";
import Prescription from "../../../components/Prescription";
import {useAuthorization} from '../../../lib/auth'
import moment from "moment";

const calcAge = (dob) => {
  const y = moment().diff(dob, "years"),
    m = moment().diff(dob, "months") % 12;
    return parseFloat(`${y}.${m}`);
  };
  
export default function Invoice() {
  const queryParams = new URLSearchParams(window.location.search)
  
  const auth = useAuthorization()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [day, setDay] = useState("");
  const [drname, setDrName] = useState(() => auth?.user?.name || "");
  const [specialization , setSpecialization] = useState(() => auth?.user?.specialization || "");
  const [regNumber, setRegNumber] = useState(() => auth?.user?.regNumber || "");
  const [dremail, setDrEmail] = useState(() => auth?.user?.email || "");
  const [drphone, setDrPhone] = useState(() => auth?.user?.phone || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState("");
  const [concern, setConcern] = useState(() => queryParams.get('concern'));
  const [dob, setDob] = useState("");
 
  const [doc_notes, setDoc_Notes] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };
  const downloadBtn = useRef()

  const patientPhone = queryParams.get('patientPhone')

  // useEffect(async () => {
    if(patientPhone) {
      (async () => {
        let res = await fetch(process.env.REACT_APP_API_URL + `/api/users?phone=${patientPhone}`)
        res = await res.json();
        if(res?.users && res?.users[0]){
          setName(() => res.users[0].name || "")
          setGender(() => res.users[0].gender || "")
          setEmail(() => res.users[0].email || "")
          setPhone(() => res.users[0].phone || "")
          setEmail(() => res.users[0].email || "")
          setAge(() => calcAge(res.users[0].dob || new Date()))
        }  
      })()
    }
  // }, [])

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const componentRef = useRef();

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
 

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  const handleSave = (e, status = "Save") => {
    setLoading(true);
    e.preventDefault();
    const data = {
      doctorId: auth.user.id,
      date,
      patientPhone: phone,
      concern,
    
      medicines: items,
      doc_notes,
    };
    fetch(process.env.REACT_APP_API_URL + "/api/admin/prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      if(data.status == "success"){
        // alert("Data saved Successfully...");
        const download = window.confirm('Successfully saved in db. Want to download PDF?')
        if(download){
          downloadBtn?.current?.click()
          setDate("");
          setDay("");
          setDrName("");
          setRegNumber("");
          setDrEmail("");
          setDrPhone("");
          setEmail("");
          setPhone("");
          setGender("");
          setDob("");
          setConcern("");
          setDoc_Notes("");
          setLoading(false);
        
        }
      }else{
        alert("Failed to save...");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
 
  

  // Delete function
  const deleteRow = (id) => setItems(items.filter((row) => row.id !== id))

  return (
    <Layout>
      <div className="overflow-x-hidden  bg-white   ">
        <div className=" w-full flex justify-center items-center px-6 pb-20 pt-5 min-h-screen text-black">
          <form className="pr-0 md:pr-20" onSubmit={handleSave} key="{submit}">
            <div className="flex gap-20">
              <div>
                <label className="text-lg font-semibold ">Date</label>
                <br />
                <input
                  id="input_duedate"
                  className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-60 h-10 required "
                  type="date"
                  name="duedate"
                  placeholder="Due Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-lg font-semibold ">Day</label>
                <br />

                <select
                  name="concern"
                  id="concern"
                  className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-60 h-10 required "
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                >
                  <option
                    className=" border-2 border-[#E94C60] mt-4 rounded-md w-60 h-10 required transition duration-300 "
                    value=""
                  >
                    Monday
                  </option>
                  {[
                    "Tuesday",
                    "Wednesday",
                    "Thurusday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((x, i) => (
                    <option
                      key={"day" + i}
                      className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300"
                      value={x}
                    >
                      {x}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/*-------------------------------------From ------------------------------------------*/}
            <div className="pt-10 ">
              <h3 className="text-2xl text-[#E94C60] font-bold pb-10">
                FROM(Doctor Details)
              </h3>
              <div className="w-full     pb-4 rounded-lg md:flex flex-row-3  gap-10">
                <div className="">
                  <label className="text-lg font-semibold ">Full Name</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="text"
                    name="name"
                    value={drname}
                    onChange={(e) => setDrName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold ">Specialization </label>
                  <input
                    id="input_desg"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="text"
                    name="specialization "
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold ">
                    Registration Number
                  </label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="text"
                    name="exp"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    required
                  />
                 
                </div>
              </div>
              <div className="w-full     pb-4 rounded-lg md:flex flex-row-3  gap-10">
                <div>
                  <label className="text-lg font-semibold ">Email ID</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full  h-10 required "
                    type="email"
                    placeholder="xyz@gmail.com"
                    name="email"
                    value={dremail}
                    onChange={(e) => setDrEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold ">Phone Number</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full  h-10 required "
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    maxlength="10"
                    value={drphone}
                    onChange={(e) => setDrPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="pt-10 flex ">
              <p className="text-lg font-semibold ">Your Signature:</p>{" "}
              <input type="file" className="pl-4" onChange={handleChange} />
              <img className="w-60 h-20 p-2 shadow" src={file || auth?.user?.signature || ""} />
            </div>

            <div className="pt-10 ">
              <h3 className="text-2xl text-[#E94C60] font-bold pb-10">
                Patient Details
              </h3>
              <div className="w-full     pb-4 rounded-lg md:flex flex-row-3  gap-10">
                <div className="">
                  <label className="text-lg font-semibold ">Full Name</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold ">Gender</label>
                  <br />

                  <select
                    name="gender"
                    id="gender"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-60 h-10 required "
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    required
                  >
                    <option
                      className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
                      value=""
                    >
                      Select your gender
                    </option>
                    <option
                      className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
                      value="male"
                    >
                      Male
                    </option>
                    <option
                      className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
                      value="female"
                    >
                      Female
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-lg font-semibold ">Age</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="number"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <label
                    for="input__city"
                    className="floating__label"
                  ></label>
                </div>
              </div>
              <div className="w-full  pb-4 rounded-lg md:flex flex-row-3  gap-10">
                <div>
                  <label className="text-lg font-semibold ">Email ID</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold ">Phone Number</label>
                  <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                    type="tel"
                    name="phone"
                    placeholder="+91"
                    pattern="[0-9]{10}"
                    maxlength="10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label
                    for="input__phone"
                    className="floating__label"
                  ></label>
                </div>
              </div>
            </div>
            <div className="w-full pt-6 flex gap-4 md:gap-10">
              <label htmlFor="concern" className="font-bold text-gray-700 pt-6 ">
                {" "}
                Diagnosis From:{" "}
              </label>
              <input
                    id="input_name"
                    className="px-4 border-2 border-[#E94C60] mt-4 rounded-md h-10 required "
                    type="text"
                    name="age"
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    required
                  />
            {/*}  <select
                name="concern"
                id="concern"
                className="px-4 border-2 border-[#E94C60] mt-4 ml-4 rounded-md w-60 h-10 required "
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
                    className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 "
                    value={x}
                  >
                    {x}
                  </option>
                ))}
                </select>*/}
            </div>
           
            <div className="pt-10 ">
              <h3 className="text-2xl text-[#E94C60] font-bold pb-10">
                Prescription
              </h3>
              <h5 className="text-xl font-semibold text-black pb-4">
                 
              
      <input className="text-xl mr-4 w-4 h-4" type="checkbox" checked={checkedOne} onChange={handleChangeOne} />
     Medicine
      </h5>
      {checkedOne ? ( <>
              <div className="w-full     pb-4 rounded-lg   gap-10">
               
                <Prescription setItems={setItems} />

                {/*} <div className="w-full  pb-4 rounded-lg md:flex flex-row-3  gap-10 pt-10">
                  <div>
                    <label className="text-lg font-semibold ">AT (morning, afternoon, dinner)</label><br />
                    <select name="duration_at" id="duration_at" className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                      onChange={(e) => setDuration_at(e.target.value)}
                      value={duration_at}
                      required>
                      <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="morning">Morning </option>
                      <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="afternoon">Afternoon</option>
                      <option className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none" value="dinner">Dinner</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-lg font-semibold ">Time</label>
                    <input id="input_time" className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                      type="time"

                      name="time"


                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    /></div>
                  <div>
                    <label className="text-lg font-semibold ">Medicine Name</label>
                    <input id="input_name" className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                      type="text"

                      name="medicine"
                      value={medicine_name}
                      onChange={(e) => setMedicine_Name(e.target.value)}
                      required
                    />

                  </div>
                </div>
                <div className="w-full  pb-4 rounded-lg md:flex flex-row-3  gap-10 pt-10">
                  <div>
                    <label className="text-lg font-semibold ">NO, of Pills/Capsule</label>
                    <input id="input_Nop" className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
                      type="number"

                      name="Nop"


                      value={Nop}
                      onChange={(e) => setNop(e.target.value)}
                      required
                    /></div>
                  <div>
                    <label className="text-lg font-semibold ">Before or After Meal</label>
                    <div className="flex gap-6 pt-4">

                      <button className="px-4 py-1 w-40 h-10 border-2 border-[#E94C60] text-[#E94C60] rounded-lg focus:text-white focus:bg-[#E94C60]" value="meal" onClick={(e) => setMeal('Before')}>Before</button>
                      <button className="px-4 py-1 w-40 h-10 border-2 border-[#E94C60] text-[#E94C60] rounded-lg focus:text-white focus:bg-[#E94C60]" value="meal" onClick={(e) => setMeal('After')}>After</button>

                    </div>
                  </div>

                </div>
                <div className="w-full flex justify-end items-right">
                  <button className="px-4 py-1 w-40 h-10  rounded-lg text-white bg-[#E94C60]" >Add More</button>
                </div>
                </div>*/}
              </div>

              <div className="w-full pt-10 pb-10">
                <table width="100%" className="mb-6 ">
                  <thead>
                    <tr className="bg-[#E94C60]  text-[10px] md:text-[16px] text-white border-1 border-black rounded-sm ">
                      <td className="font-bold text-center px-2 py-4">Name of Med.</td>
                      <td className="font-bold text-center px-2 py-4">Frequency</td>
                     
                     <td className="font-bold text-center px-2 py-4">Route of Administration</td>
                      <td className="font-bold text-center px-2 py-4">No. of Days</td>
                     
                      <td className="font-bold text-center px-2 py-4">Comments</td>
                      <td></td>
                    </tr>
                  </thead>
                  {items.map(
                    ({ id, medicine_name, Nop, roa, duration, comment }) => (
                      <React.Fragment  key={id}>
                        <tbody>
                          <tr className="h-10 border-black border-2 text-black text-[10px] md:text-sm text-center">
                            <td className="">{medicine_name}</td>

                            <td className="">{Nop}</td>
                          
                            <td className="">{roa}</td>
                            <td className="">{duration}</td>
                         
                             <td className="">{comment}</td>
                            
                <td>
                  <button onClick={() => deleteRow(id)}>
                   <i className="fa fa-trash text-[#E94C60]"></i>
                  </button>
                </td>
                          </tr>
                        </tbody>
                      </React.Fragment>
                    )
                  )}
                </table>
               
              </div>
              </>) : null }
              <div className="w-full md:w-full">
                <h5 className="text-xl font-semibold text-black pb-4">
                <input className="mr-2 w-4 h-4" type="checkbox" checked={checkedTwo} onChange={handleChangeTwo} />  Add note{" "}
                </h5>
             { checkedTwo ? ( <>
               <textarea
                  className="h-40 w-full  md:w-full  border-2 border-[#E94C60] rounded-sm p-4 text-gray-700 required"
                  name="comment"
                  value={doc_notes}
                  onChange={(e) => setDoc_Notes(e.target.value)}
                  placeholder="Type something like what should avoid and to do's"
                />
                </>) : null } 
              </div>
            </div>

            <div className="flex justify-end items-right pt-10 ">
              {/*-------------------------------------Submit------------------------------------------*/}
              <span
                type="submit"
                className="bg-[#E94C60] w-52 h-12  ml-6 text-center text-white rounded-md cursor-pointer flex justify-center items-center"
                name="status"
                id="status"
                defaultValue="Save"
                disabled={loading ? true : false}
                onClick={(e) => handleSave(e)}
              >
                {loading ? "Saved" : "Save"}
              </span>

              {/*---------------------------------------Print Button--------------------------------------------------------------------*/}
              <ReactToPrint
                trigger={() => (
                  <span ref={downloadBtn} className="bg-[#E94C60] w-52 h-12 text-center text-white rounded-md ml-6 cursor-pointer flex justify-center items-center">
                    Download PDF
                  </span>
                )}
                content={() => componentRef.current}
              />
              <div style={{ display: "none" }}>
                <div ref={componentRef} className="p-5 mx-20 pt-10">
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
                      <p className="text-sm text-right">Date: {date}</p>
                      <div className="w-full flex gap-16 pt-20">
                        <div className="w-1/2">
                          <p className="text-sm">Patient Name: {name}</p>
                          <p className="text-sm">Gender: {gender[0]?.toUpperCase() + gender?.substring(1)}</p>
                          <p className="text-sm">Age: {age}</p>
                          
                          <p className="text-sm">Phone Number: {phone}</p>
                         
                        </div>
                        <div className="w-1/2 text-left ">
                        <p className="text-sm">CareNest</p>
                          <p className="text-sm">Doctor Name: {drname}</p>
                          <p className="text-sm">Reg. Number: {regNumber}</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-left pt-10">
                      
                <p className="text-md">Probable Diagnosis: {concern}</p>
              </div>
                  <div className="mt-20">
                
              {items?.length > 0 ?
                    
                        ( <table width="100%" className="mb-10">
                      <thead>
                        <tr className="bg-[#E94C60] text-[14px] md:text-[16px] text-white">
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
                      {items.map(
                        ({ id, medicine_name, Nop, roa, duration, comment }) => (
                          <React.Fragment key={id}>
                            <tbody>
                              <tr className="h-10 border-black border-2 text-black text-[10px] md:text-[14px]">
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
                ): ""
                        }
                  </div>
                  <div className=" mt-20 ">
                    <div className="mt-16">
                        {doc_notes ? 
                            <p className="text-[10px] md:text-[16px]">
                                    <span className="text-2xl font-bold pr-4">Notes:</span> {doc_notes} 
                            </p>
                            : ""
                        }
                    </div>
                  </div>

                  <div className="mt-40 flex items-right justify-end">
                   <div>
                    <img className="w-52 h-20 p-2 shadow" src={file || auth?.user?.signature || ""} />
                    <p className="text-sm text-center"> {drname}</p>
                    <p className="text-sm text-center">(Specialized in {specialization})</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>

      </div>
    </Layout>
  );
}
