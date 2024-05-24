import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";

const AddBatchesStudent = () => {
  const { id } = useParams();
  const [courseData, setCourData] = useState([]);
  const [data, error, loading] = useFetch(
    `/batches/batch-detail?batchId=${id}`
  );
  console.log(data.data);

  // remove student data from batch
  const removeData = async (e) => {
    console.log(e.target.id);
    try {
      const data = await axios.post(
        `/batches/remove-student?batchId=${id}`,
        { studentid: e.target.id }
      );
      if (data.status === 200) {
        toast.success(data?.data?.message || "Data Removed Success");
        window.location.reload();
      } else {
        toast.warn("Something went wrong!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch course data
  const coursefetchData = async (id) => {
    try {
      const data = await axios.get(
        `/enroll/batch-unassign-student?courId=${id}`
      );
      setCourData(data?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    coursefetchData(data?.data?.bcourse?._id);
  }, [data?.data?.bcourse?._id]);
  console.log(courseData);

  // add student data in batches
  const addStudentData = async (e) => {
    console.log(e.target.id);
    try {
      const data = await axios.post(
        `/batches/add-student?batchId=${id}`,
        { studentid: e.target.id }
      );
      if (data.status === 200) {
        toast.success(data?.data?.message || "student Added Success");
        window.location.reload();
      } else {
        toast.warn("Something Went Wrong!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Home>
      <div className="pl-3  p-md-3 text-white w-[100%]  relative">
        <section className="section py-3">
          <div className="text-xl font-medium ">
            <h1>Add Student In Batches</h1>
            <div></div>
          </div>
        </section>

        {/* homeslide Table */}
        <div className="row space-y-5 lg:space-y-0">
          <div className="col col-lg-7">
            <div className="">
              <div className="section-header-breadcrumb m-50% flex flex-col justify-center">
                <h2 className="text-lg font-medium text-center">
                  Batch Name : {data?.data?.btitle}
                </h2>
                <h2 className="text-lg font-medium text-center">
                  Course Name : {data?.data?.bcourse?.ctitle}
                </h2>
                <p className="text-lg font-medium text-center">
                  Batch Start Date : {data?.data?.bstartdate}
                </p>
                <p className="text-lg font-medium text-center">
                  Batch Time : {data?.data?.btime}
                </p>
                <p className="text-lg font-medium text-center">
                  Batch Seats : {data?.data?.bseats}
                </p>
                <p className="text-lg font-medium text-center">
                  Batch Seats Left :{" "}
                  {data?.data?.bseats - data?.data?.student?.length}
                </p>
              </div>
              {/* Display loading message while data is being fetched */}
              {loading && <h1 className="text-white">Loading...</h1>}
              {/* Display error message if there's an error */}
              {error && <h1 className="text-white">{error.message}</h1>}
              {/* Display Category data if available */}
              <h1 className="text-xl font-medium text-center my-8">
                Batch Students
              </h1>
              {data && (
                <div className="table-responsive Ttable">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Name</th>

                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data?.data?.student?.map((item, index) => (
                        <tr key={index} className="Tbody">
                          <td>{item.sname}</td>
                          <td className="flex gap-2 items-center justify-center">
                            <Link
                              className="py-2 px-3 rounded-md view-icon text-white"
                              id={item._id}
                              onClick={removeData}
                            >
                              Remove
                            </Link>

                            {/* Action links for each trainer */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {data && (
            <div className="col-lg-5 lg:px-5">
              <h1 className="text-xl font-medium text-center my-8">
                Course Students
              </h1>
              <div className="table-responsive Ttable">
                <table className=" table-striped w-[100%]">
                  <thead>
                    <tr className="Thead">
                      <th scope="col">Name</th>
                      <th scope="col">Enroll Date</th>
                      <th scope="col">Add</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {/* Map through trainers data and display in table rows */}
                    {courseData?.map((item, index) => (
                      <tr key={index} className="Tbody">
                        <td>{item?.studentid?.sname}</td>
                        <td>{item?.enrolldate.substring(0, 10)}</td>
                        <td className="flex gap-2 items-center justify-center">
                          <Link
                            className="py-2 px-3 rounded-md view-icon text-white"
                            id={item?.studentid?._id}
                            onClick={addStudentData}
                          >
                            Add
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Home>
  );
};

export default AddBatchesStudent;
