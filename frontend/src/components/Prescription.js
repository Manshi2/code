import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Prescription({ items, setItems }) {
  const [duration_at, setDuration_at] = useState("morning");
 
  const [medicine_name, setMedicine_Name] = useState("");
  const [duration, setDuration] = useState("");
  const [Nop, setNop] = useState("");
  const [meal, setMeal] = useState("");
  const [comment, setComment] = useState("");
  const [roa, setRoA] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!medicine_name || !duration_at || !duration || !Nop || !meal || !roa ) {
      alert("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        medicine_name,
        duration_at,
        duration,
        
        Nop,
        meal,
        comment,
        roa
      };
      setItems((current) => [...current, newItems]);
      setMedicine_Name("");
      setDuration_at("");
      setDuration("");
      
      setNop("");
      setMeal("");
      setComment("");
      setRoA("")
    }
  };

  return (
    <>
      <div>
      <div className="w-full   pt-10  pb-4 rounded-lg   gap-10">
                <label
                  htmlFor="duration"
                  className="font-bold text-gray-700 pt-4"
                >
                  {" "}
                  Duration Period:{" "}
                </label>
                <select
                  name="duration"
                  id="duration"
                  className="px-4  bg-[#9AB898] mt-2 ml-4 rounded-md w-60 h-10 required text-white "
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                >
                  <option
                    className=" px-4 py-2 bg-[#9AB898] text-white transition duration-300 "
                    value=""
                  >
                    Select Duration
                  </option>
                  {[
                    "1 day",
                    "5 days",
                    "7 days",
                    "10 days",
                    "15 days",
                    "30 days",
                  ].map((x, i) => (
                    <option
                      key={"duration" + i}
                      className="px-4 py-2 border  text-white transition duration-300 "
                      value={x}
                    >
                      {x}
                    </option>
                  ))}
                </select>
              </div>
        <div className="w-full  pb-4 rounded-lg md:flex flex-row-3  gap-10 pt-10">
          <div className="md:w-1/3">
            <label className="text-lg font-semibold ">
              AT (morning, afternoon, dinner)
            </label>
            <br />
            <select
              name="duration_at"
              id="duration_at"
              className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
              onChange={(e) => setDuration_at(e.target.value)}
              value={duration_at}
              required
            >
              <option
                className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
                value="morning"
              >
                Morning{" "}
              </option>
              <option
                className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
                value="afternoon"
              >
                Afternoon
              </option>
              <option
                className="px-4 py-2 border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none"
                value="dinner"
              >
                Dinner
              </option>
            </select>
          </div>
         
          <div className="md:w-1/3">
            <label className="text-lg font-semibold ">Medicine Name</label>
            <input
              id="input_name"
              className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
              type="text"
              name="medicine"
              value={medicine_name}
              onChange={(e) => setMedicine_Name(e.target.value)}
              required
            />
          </div>
           <div className="md:w-1/3">
            <label className="text-lg font-semibold ">
              Frequency
            </label>
            <input
              id="input_Nop"
              className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
              type="Number"
              name="Nop"
              value={Nop}
              onChange={(e) => setNop(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="w-full  pb-4 rounded-lg md:flex flex-row-3  gap-10 pt-10">
         
          <div>
            <label className="text-lg font-semibold ">
              Before or After Meal
            </label>
            <div className="flex gap-6 pt-4">
              <span
                className={"px-4 py-1 w-40 h-10 border-2 border-[#E94C60] text-[#E94C60] rounded-lg focus:text-white focus:bg-[#E94C60] cursor-pointer flex justify-center items-center " + (meal == 'Before' ? 'bg-[#E94C60] text-white' : '')}
                value="meal"
                onClick={(e) => setMeal("Before")}
              >
                Before
              </span>
              <span
                className={"px-4 py-1 w-40 h-10 border-2 border-[#E94C60] text-[#E94C60] rounded-lg focus:text-white focus:bg-[#E94C60] cursor-pointer flex justify-center items-center " + (meal == 'After' ? 'bg-[#E94C60] text-white' : '')}
                value="meal"
                onClick={(e) => setMeal("After")}
              >
                After
              </span>
            </div>
          </div>
          <div>
          <label className="text-lg font-semibold pt-2 ">
              Route of Administration
            </label>
            <input
              id="input_RoA"
              className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
              type="text"
              name="comments"
              value={roa}
              onChange={(e) => setRoA(e.target.value)}
              required
            />
            </div>
        </div>
        <div className="w-full md:w-4/5 gap-4 md:gap-10 mt-8">
         
            <div> <label className="text-lg font-semibold pt-2 ">
              Comments
            </label>
            <input
              id="input_Nop"
              className="px-4 border-2 border-[#E94C60] mt-4 rounded-md w-full h-10 required "
              type="text"
              name="comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            /></div> 
          </div>
        <div className="w-full flex justify-end items-right mt-8">
          <span
            className="px-4 py-1 w-40 h-10  rounded-lg text-white bg-[#E94C60] cursor-pointer flex justify-center items-center"
            onClick={handleSubmit}
          >
            Add
          </span>
        </div>
      </div>
    </>
  );
}
