import { FaDownload, FaRegEdit, FaShareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";

const EStudentInfo = ({ student }) => {
  console.log(student);
  return (
    <>
      <section>
        <div className="flex justify-between items-center border-b-2 p-3 border-yellow-500  mb-3 text-white">
          <h1>Student Information</h1>

          <ul className="flex items-center gap-3">
            <li className="view-icon p-2 rounded-md">
              <FaRegEdit />
            </li>
            <li className="edit-icon p-2 rounded-md">
              <FaDownload />
            </li>
            <li className="delete-icon p-2 rounded-md">
              <FaShareAlt />
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex sm:flex-row gap-3 text-white p-3">
          <div className="box p-0 relative sm:w-[40%] w-[100%]">
            <img
              src={
                student?.studentid?.sbackgroundUrl === "" || !student?.studentid?.sbackgroundUrl
                  ? "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                  : `https://api.logicmitra.com:8086/uploads/students/${student?.studentid?.sbackgroundUrl}`
              }
              alt="image"
              className="w-[100%] h-44 rounded-md object-cover border-b-2 border-yellow-500 "
            />
            <div className="">
              <div className="w-40 h-40  mx-auto absolute top- left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <img
                  src={
                    student?.studentid?.sprofilepicUrl === "" || ! student?.studentid?.sprofilepicUrl
                      ? "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                      : `https://api.logicmitra.com:8086/uploads/students/${student?.studentid?.sprofilepicUrl}`
                  }
                  alt="image"
                  className="w-100 h-100  rounded-full image1 object-cover"
                />
              </div>
            </div>
            <div className="btn2 font-extrabold w-[90%] text-black  text-center mx-auto mt-24">
              <p> ID : {student?.studentid?._id}</p>
            </div>

            <ul className="px-5 py-2 flex flex-col items-center align-middle">
              <h1 className="text-center text-xl font-extrabold">
                {" "}
                {student?.studentid?.sname}
              </h1>
              <li className="flex items-center gap-2">
                <MdEmail /> {student?.studentid?.semail}
              </li>
              <li className="flex items-center gap-2">
                <PiPhone /> {student?.studentid?.sphone}
              </li>
            </ul>
          </div>

          <div className="box sm:w-[60%] w-[100%] space-y-2">
            <h1 className="Text font-bold"> Enrolled Course</h1>
            <h1 className="text-xl font-extrabold ">
              {" "}
              {student?.courseid?.ctitle}
            </h1>
            <ul className="">
              <li>
                Trained By :
                <span className="Text"> {student?.trainerid?.sname}</span>
              </li>
              <li>Enrolled on : {student?.enrolldate.substring(0, 10)}</li>
              <li>Enrollment ID : {student?.id}</li>
              <li>At Price : {student?.payamount}</li>
              <li>Payment Mode : {student?.paymode} </li>
              <li>Payment Method : UPI (Phone pay)</li>
              <li>Coupon Applied : {student?.couponid} </li>
              <li>Through Referrals : Nile</li>
              <li>At discount : {student?.appdiscount}%</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default EStudentInfo;
