import React, { useState } from "react";
import FieldUST from "./FieldUST";
import { FaTimeline } from "react-icons/fa6";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Home from "../../Home";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState("AlluserList");

  //console.log(open);
  const handleClickOpen = (elm) => {
    setOpen(elm);
  };

  const [params, SetParams] = useState({
    title: "",
    message: "",
    banner: "",
    userId: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    SetParams((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (params.userId.length == 0 || !params.title || !params.message) {
      toast.warn("Fill all fields");
      return;
    }
    try {
      const { data } = await axios.post(
        "https://api.logicmitra.com/api/notification/selected-user",
        params
      );
      if (data.response == "success") {
        toast.success("Notification Sent");
        //console.log(data);
        navigate("/");
      } else {
        toast.warn("Try Again!!");
        //console.log(data);
      }
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };
  //console.log(params);

  return (
    <>
      <Home>
        <section className="w-[100%] py-3 p-3 mb-16">
          <section className="section py-3">
            <div className="text-xl font-medium text-white  d-flex justify-between items-center">
              <h1>Notification</h1>
            </div>
          </section>
          <div className="box text-white p-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="inputelement"
                  className=""
                  name="Notificationuser"
                  onClick={() => handleClickOpen("UserList")}
                />
                <label className="text-white" htmlFor="inputelement">
                  {" "}
                  All Users
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="inputelement"
                  className=""
                  name="Notificationuser"
                  onClick={() => handleClickOpen("TrainerList")}
                />
                <label className="text-white" htmlFor="inputelement">
                  Trainers
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="inputelement"
                  className=""
                  name="Notificationuser"
                  onClick={() => handleClickOpen("StudentList")}
                />
                <label className="text-white" htmlFor="inputelement">
                  Students
                </label>
              </div>
            </div>

            <div className="">
              {
                <FieldUST
                  open={open}
                  setOpen={setOpen}
                  userId={params.userId}
                  SetParams={SetParams}
                />
              }
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <p> Title</p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Title"
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>

              <div className="space-y-2">
                <p> Messages</p>
                <textarea
                  type="text"
                  name="message"
                  onChange={handleChange}
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                  placeholder="Type here..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <p> Image</p>
                <input
                  type="file"
                  name="banner"
                  onChange={handleChange}
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                />
              </div>

              <button
                className="Add-btn px-3 py-2 rounded-md mt-3 "
                onClick={handleSendNotification}
              >
                {" "}
                Send Notification
              </button>
            </div>
          </div>
        </section>
      </Home>
    </>
  );
};

export default Notification;
