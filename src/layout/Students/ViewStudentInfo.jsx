import React, { useState } from "react";
import Profile from "../../components/Profile";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { FaLocationDot } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { MdOutlinePerson } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import CourseDetails from "../../components/StudentDetails/studentctrdetails/CourseDetails";
import TransactionDetails from "../../components/StudentDetails/studentctrdetails/TransactionDetails";
import ReviewDetails from "../../components/StudentDetails/studentctrdetails/Review";
import { FaWhatsapp } from "react-icons/fa";
import { BiChevronUp } from "react-icons/bi";

import { BiChevronDown } from "react-icons/bi";
import EnrollStudent from "../../components/StudentDetails/studentctrdetails/EnrollStudent";
import BatchStudent from "../../components/StudentDetails/studentctrdetails/BatchStudent";
import Home from "../../Home";

function ViewStudentInfo() {
  const content1 =
    " data is here o fghj fghj ghj rtymrtyu rtyu dfgh vishu sahu gram karapasad dist durg chhhatisagahd";
  const { id } = useParams();
  const [data, error, loading] = useFetch(`/user/details?userID=${id}`);

  console.log(data);

  const [CTR, setCTR] = useState("courses");

  console.log(CTR);

  const [show, setshow] = useState(false);
  const showmoreclick = () => {
    setshow(!show);
  };

  // Fetch category data using a custom hook (useFetch)
  const [CityList, error3, loading3] = useFetch("/address/city-list", true);

  return (
    <>
      <Home>
        {loading && <h1 className="text-white ">Loading...</h1>}
        {error && <h1 className="text-white ">{error.message}</h1>}

        {data?.data && (
          <>
            <div className="text-white py-3 p-3 col space-y-4">
              <h1 className="heading">Student Profile</h1>

              <div className="  md:flex md:space-x-4 space-y-4 md:space-y-0">
                {/* image profile */}
                <div className=" w-[100%] md:w-[32%]  box p-0  space-y-5 flex-col justify-center items-center content-center align-middle relative">
                  <img
                    src={
                      data?.data?.sbackgroundUrl === "" ||
                      !data?.data?.sbackgroundUrl
                        ? "https://img.freepik.com/free-photo/perspective-home-desk-white-frame_1258-255.jpg"
                        : `https://api.logicmitra.com:8086/uploads/user/${data?.data?.sbackgroundUrl}`
                    }
                    alt="image"
                    className={`w-[100%] h-44 object-cover  border-b-2 border-yellow-500
                `}
                  />

                  <div className="py-4 md:py-6">
                    <div className="w-40 h-40  mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                      <img
                        src={
                          data?.data?.sprofilepicUrl === "" ||
                          !data?.data?.sprofilepicUrl
                            ? "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                            : `https://api.logicmitra.com:8086/uploads/user/${data?.data?.sprofilepicUrl}`
                        }
                        alt="image"
                        className="w-100 h-100  rounded-full image1 object-cover"
                      />
                    </div>
                  </div>
                  <div className="btn2 font-extrabold  w-[90%] text-gray-800  text-center mx-auto mt-3 mb-3 md:my-0">
                    <p> ID : {data?.data?.id}</p>
                  </div>
                </div>

                {/* student details name so on */}
                <div className=" w-[100%] md:w-[32%] box space-y-4 ">
                  <h1 className="heading1">{data?.data?.sname}</h1>
                  <ul>
                    <li className="flex gap-2 items-center">
                      <CgCalendarDates className="text-xs" /> {data?.data?.sdob}
                    </li>
                    <li className="flex gap-2 items-center">
                      <MdOutlineMail className="text-xs" /> {data?.data?.semail}
                    </li>
                    <li className="flex gap-2 items-center">
                      <FaPhoneAlt className="text-xs" /> {data?.data?.smobile}
                    </li>
                    <li className="flex gap-2 items-center">
                      <FaWhatsapp className="text-xs" /> {data?.data?.swhatsapp}
                    </li>
                  </ul>
                  <div className="small-box flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <PiStudent className="text-sm" />
                      <p className="capitalize" style={{ color: "#CCAA00" }}>
                        {data?.data?.levelOfeducation}
                      </p>
                    </div>
                    <p>{data?.data?.passOutYear}</p>
                  </div>

                  <div className="small-box flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <FaLocationDot className="text-sm" />

                      <p className="">
                        {CityList?.data
                          ?.filter((elm) => {
                            return elm.id === data?.data?.scity;
                          })
                          .map((elm) => {
                            return (
                              <>
                                <div className="" key={elm.id}>
                                  {elm.title}
                                </div>
                              </>
                            );
                          })}{" "}
                        {data?.data?.sstate} {data?.data?.saddress}
                      </p>
                    </div>
                    <p className="flex flex-col">
                      {data?.data?.scountry} {data?.data?.spincode}
                    </p>
                  </div>
                </div>

                {/* description student */}
                <div className="w-[100%] md:w-[32%]  box space-y-4 ">
                  <h1 className="heading1"> Description:</h1>

                  <div className="flex flex-col items-start justify-between space-y-14">
                    <p>
                      {show
                        ? `${data?.data?.sintro}`
                        : `${data?.data?.sintro.slice(0, 50)}...`}
                    </p>

                    <button className="" onClick={() => showmoreclick()}>
                      {show ? (
                        <div className="flex items-center  text-sm gap-1 w-[100%]">
                          {" "}
                          <BiChevronUp className="text-yellow-600 text-2xl font-extrabold" />{" "}
                          Show less
                        </div>
                      ) : (
                        <div className="flex items-center  text-sm gap-1  w-[100%]">
                          {" "}
                          <BiChevronDown className="text-yellow-600 text-2xl font-extrabold" />{" "}
                          Show more
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* tabpanel  */}

              <div className="">
                <div className="">
                  <ul
                    className="flex  justify-around p-2    relative "
                    style={{ borderBottom: "2px solid #04775A" }}
                  >
                    {/* <li className="cursor-pointer" onClick={() => setCTR("courses")}>
                Courses
                <div
                  className={` ${
                    CTR === "courses" ? " CTR1" : "border-b-0"
                  } cursor-pointer text-center absolute   w-[100%]`}
                ></div>
              </li> */}

                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("transaction")}
                    >
                      Transaction
                      <div
                        className={` ${
                          CTR === "transaction" ? " CTR2" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("review")}
                    >
                      Review
                      <div
                        className={` ${
                          CTR === "review" ? " CTR3" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("enrollstudent")}
                    >
                      Enroll Courses
                      <div
                        className={` ${
                          CTR === "enrollstudent" ? " CTR4" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => setCTR("batch")}
                    >
                      Batch
                      <div
                        className={` ${
                          CTR === "batch" ? " CTR5" : "border-b-0"
                        } cursor-pointer text-center absolute   w-[100%]`}
                      ></div>
                    </li>
                  </ul>

                  {CTR === "transaction" ? (
                    <TransactionDetails StudentData={data} />
                  ) : CTR === "enrollstudent" ? (
                    <EnrollStudent StudentData={data} />
                  ) : CTR === "batch" ? (
                    <BatchStudent StudentData={data} />
                  ) : CTR === "review" ? (
                    <ReviewDetails StudentData={data} />
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </Home>
    </>
  );
}

export default ViewStudentInfo;
