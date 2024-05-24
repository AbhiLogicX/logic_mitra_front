import { FaClock } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { VscTriangleRight } from "react-icons/vsc";
import { useEffect, useState } from "react";
import RatingStars from "../../RatingStar.js/RateStars";
import FormatPrice from "../../FormatPrice/FormatPrice";

const CourseEnroll = ({ CourseData }) => {
  const [data, setdata] = useState();

  useEffect(() => {
    setdata(CourseData);
  }, [CourseData]);

 
  return (
    <>
      <section className="text-white py-3 sm:p-3 space-y-4 relative">
        {/* //decription  */}

        <div className="Cbox">
          <div className="space-y-1  w-[100%] lg:w-[50%]">
            <h1 className="font-bold text-xl"> {data?.data?.ctitle}</h1>
            <p>{data?.data?.cduration}</p>

            {/* <div className="space-y-4">
          <h1>Learn :</h1>
      <ul className='grid grid-cols-2 sm:grid-cols-4 gap-2  lg:grid-cols-4'>
        <li className='small-box px-3 '>Html</li>
        <li className='small-box px-3'>Css</li>
        <li className='small-box px-3'>Javascript</li>
        <li className='small-box px-3'>React js</li>
      </ul>
</div> */}

            <ul>
              <li>
                <span className="Text font-bold flex gap-2">
                  {" "}
                  {data?.data?.ratings}{" "}
                  {<RatingStars stars={data?.data?.ratings} reviews={"vish"} />}{" "}
                </span>{" "}
              </li>
              <li className="font-bold">
                {" "}
                <span>Trained By :</span>{" "}
                <span className="Text"> {data?.data?.ctrainer?.sname} </span>
              </li>
              <li className=""> 20/01/2024 xa English , Hindi</li>
            </ul>
          </div>
        </div>

        {/* what will you learn  */}
        <div className="Cbox space-y-2 w-[100%] lg:w-[60%]">
          <h1 className="font-bold Text "> What will you learn :</h1>
          <ul className="grid grid-cols-1  sm:grid-cols-2 gap-1">
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
            <li className="flex items-center gap-1">
              {" "}
              <VscTriangleRight className="text-sm Text" /> Prepare for Industry
              Certification Exam
            </li>
          </ul>
        </div>

        {/* enroll now box car  */}

        <div className="box space-y-1 md:w-[100%]  lg:w-[30%] lg:absolute lg:top-0 lg:right-5">
          <div className="h-52">
            <img
              src={
                data?.data?.ccoverimage === "" || !data?.data?.ccoverimage
                  ? "https://img.freepik.com/free-photo/perspective-home-desk-white-frame_1258-255.jpg"
                  : `https://api.logicmitra.com:8086/uploads/courses/${data?.data?.ccoverimage}`
              }
              alt="iimage "
              className="w-[100%] h-[100%] rounded-lg  border-2 border-yellow-500"
            />
          </div>

          <h1 className="font-bold text-xl"> {data?.data?.ctitle} </h1>
          <ul className="flex gap-2 font-bold">
            <li className="Text">
              {<FormatPrice price={data?.data?.cfees} />}
            </li>
            <li>
              {" "}
              <del>{data?.data?.cfees * 2}</del>
            </li>
            <li className="Text"> {data?.data?.cofferfees} Offers </li>
          </ul>
          <ul className="">
            <h1 className="font-bold text-lg"> This Course includes :</h1>
            <li className="flex items-center gap-2">
              {" "}
              <FaClock className="text-sm" /> 2.5 months on demand video
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <MdAssignmentAdd className="text-sm" /> 3 Assignments
            </li>
            <li className="flex items-center gap-2">
              {" "}
              <FaProjectDiagram className="text-sm" /> 2 Real-time Project
            </li>
            <li className="flex items-center gap-2">
              <IoMdPhonePortrait className="text-sm" /> Access on Mobile and
              Laptop
            </li>
            <li className="flex items-center gap-2">
              <GrCertificate className="text-sm" /> Certification of completion
            </li>
          </ul>

          <button className="enroll-btn w-[100%] rounded-sm py-2 mt-3">
            {" "}
            Enroll Now{" "}
          </button>
        </div>
      </section>
    </>
  );
};

export default CourseEnroll;
