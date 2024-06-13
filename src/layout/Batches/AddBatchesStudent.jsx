import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import Home from "../../Home";

const AddBatchesStudent = () => {
  // const [bCourseId, setbCourseId] = useState(null);
  // const [fetchedMainData, setFetchedMainData] = useState(true);
  // const [fetchedCourses, setFetchedCourses] = useState(false);

  const { id } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [batchData, setBatchData] = useState({});
  const [fetchedData, setFetchedData] = useState({
    courseFetched: false,
    courseLoading: true,
    cousreErr: false,
    courseErrMsg: "Something went wrong",
    batchFetched: false,
    batchLoading: true,
    batchErr: false,
    batchErrMsg: "Something went wrong",
  });

  useEffect(() => {
    if (!fetchedData.courseFetched && fetchedData.batchFetched) {
      fetchCourseData();
    }
    if (!fetchedData.batchFetched) {
      fetchBatchData();
    }

    async function fetchBatchData() {
      await axios
        .get(`/batches/batch-detail?batchId=${id}`)
        .then((res) => {
          if (res.status === 200) {
            setBatchData(res.data);
            fetchedData.batchFetched = true;
            fetchedData.batchLoading = false;
          } else {
            setBatchData([]);
            fetchedData.batchFetched = false;
            fetchedData.batchLoading = true;
          }
        })
        .catch((err) => {
          setBatchData([]);
          fetchedData.batchFetched = false;
          fetchedData.batchLoading = true;
          fetchedData.batchErr = true;
          fetchedData.batchErrMsg = err?.message
            ? err.message
            : "Something went wrong";
        });
    }

    async function fetchCourseData() {
      await axios
        .get(
          `/enroll/batch-unassign-student?courId=${batchData.data.bcourse._id}`
        )
        .then((res) => {
          console.log("course ---->", res);
          if (res.status === 200) {
            setCourseData(res.data.data);
            fetchedData.courseFetched = true;
            fetchedData.courseLoading = false;
          }
        })
        .catch((err) => {
          fetchedData.cousreErr = true;
          fetchedData.courseFetched = false;
          fetchedData.batchLoading = true;
          fetchedData.courseErrMsg = err?.message
            ? err.message
            : "Something went wrong";
        });
    }
  }, [
    id,
    fetchedData.courseLoading,
    fetchedData.courseFetched,
    fetchedData.batchFetched,
    fetchedData.batchLoading,
    batchData.data.bcourse._id,
    fetchedData,
  ]);

  // const [data, error, loading, setReload] = useFetch(
  //   `/batches/batch-detail?batchId=${id}`
  // );

  // useEffect(() => {
  //   setbCourseId(data?.data?.bcourse?._id);
  //   if (!fetchedCourses && !loading) {
  //     // //console.log("course id ----", data?.data?.bcourse?._id);
  //     courseFetchData(data?.data?.bcourse?._id);
  //   }
  // }, [fetchedCourses, loading]);

  // Fetch course data
  // const courseFetchData = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `/enroll/batch-unassign-student?courId=${id}`
  //     );
  //     if (response.status === 200) {
  //       // //console.log("res----->", response);
  //       setCourseData(response?.data?.data);
  //       setFetchedCourses(true);
  //     }`
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Remove student data from batch
  const removeData = async (e) => {
    try {
      const response = await axios.post(
        `/batches/remove-student?batchId=${id}`,
        {
          studentid: e.target.id,
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message || "Data Removed Successfully");
        // window.location.reload();
        // setReload(false);
        setFetchedData((prevState) => ({
          ...prevState,
          batchFetched: false,
          courseFetched: false,
          courseLoading: true,
          batchLoading: true,
        }));

        // courseFetchData(e.target.id);
      } else {
        toast.warn("Something went wrong!");
      }
    } catch (error) {
      toast.warn("Something went wrong!");
    }
  };
  // //console.log(data?.data?.bcourse?._id);
  // useEffect(() => {
  //   if (data?.data?.bcourse?._id) {
  //     courseFetchData(data.data.bcourse._id);
  //   }
  // }, [data?.data?.bcourse?._id]);

  // Add student data to batch
  const addStudentData = async (e) => {
    try {
      const response = await axios.post(`/batches/add-student?batchId=${id}`, {
        studentid: e.target.id,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message || "Student Added Successfully");
        // setReload(false);
        // courseFetchData(e.target.id);
        // window.location.reload();
        setFetchedData((prevState) => ({
          ...prevState,
          batchFetched: false,
          courseFetched: false,
          courseLoading: true,
          batchLoading: true,
        }));
      } else {
        toast.warn("Something went wrong!");
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <Home>
      <p>hello</p>
      <div className="pl-3 p-md-3 text-white w-[100%] relative">
        <section className="section py-3">
          <div className="text-xl font-medium">
            <h1>Add Student In Batches</h1>
          </div>
        </section>

        <div className="row space-y-5 lg:space-y-0">
          <div className="col col-lg-7">
            <div>
              <div className="section-header-breadcrumb flex flex-col justify-center m-50%">
                <h2 className="text-lg font-medium text-center">
                  Batch Name: {batchData?.data?.btitle}
                </h2>
                <h2 className="text-lg font-medium text-center">
                  Course Name: {batchData?.data?.bcourse?.ctitle}
                </h2>
                <p className="text-lg font-medium text-center">
                  Batch Start Date: {batchData?.data?.bstartdate}
                </p>
                <p className="text-lg font-medium text-center">
                  Batch Time: {batchData?.data?.btime}
                </p>
                <p className="text-lg font-medium text-center">
                  Batch Seats: {batchData?.data?.bseats}
                </p>
                <p className="text-lg font-medium text-center">
                  Batch Seats Left:{" "}
                  {batchData?.data?.bseats - batchData?.data?.student?.length}
                </p>
              </div>

              {fetchedData.batchLoading && (
                <h1 className="text-white">Loading...</h1>
              )}
              {fetchedData.batchErr && (
                <h1 className="text-white">{fetchedData.batchErrMsg}</h1>
              )}

              <h1 className="text-xl font-medium text-center my-8">
                Batch Students
              </h1>

              {batchData && (
                <div className="table-responsive Ttable">
                  <table className="table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">Name</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {batchData?.data?.student?.map((item, index) => (
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {!fetchedData.courseLoading && (
            <div className="col-lg-5 lg:px-5">
              <h1 className="text-xl font-medium text-center my-8">
                Course Students
              </h1>
              <div className="table-responsive Ttable">
                <table className="table-striped w-[100%]">
                  <thead>
                    <tr className="Thead">
                      <th scope="col">Name</th>
                      <th scope="col">Enroll Date</th>
                      <th scope="col">Add</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
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
