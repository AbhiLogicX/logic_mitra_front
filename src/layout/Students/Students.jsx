import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import swal from "sweetalert";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import Home from "../../Home";
import { useDelete } from "../../hooks/useDelete";

function Students() {
  const StudentUrl = "/students";
  //setting parameters for future requests
  const [params, setParams] = useState({
    name: "",
    startDate: "",
    endDate: "",
    filter: "",
  });

  // fetching student data
  const [data, error, loading, setReload] = useFetch(
    "/user/list?userType=student",
    params
  );

  // const [data, error, loading, setReload] = useFetchData(
  //   "/user/list?userType=student"
  // );

  console.log("sutdetadat", data);
  //setting student categories count
  const [totalStudents, setTotalStudents] = useState(0);
  const [organizationStudents, setOrganisationStudents] = useState(0);
  const [inactiveStudents, setInactiveStudents] = useState(0);
  const [blockedStudents, setBlockedStudents] = useState(0);
  useEffect(() => {
    setTotalStudents(0);
    setBlockedStudents(0);
    setInactiveStudents(0);
    setOrganisationStudents(0);
    data?.data?.map((item) => {
      setTotalStudents((prevTotal) => prevTotal + 1);
      if (item.status === "blocked") {
        setBlockedStudents((blockedStudents) => blockedStudents + 1);
      } else if (item.status === "1") {
        setOrganisationStudents(
          (organisationStudents) => organisationStudents + 1
        );
      } else if (item.status === "0") {
        setInactiveStudents((inactiveStudents) => inactiveStudents + 1);
      }
    });
  }, [data, params]);

  //handling filters
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  // const { Delete } = useDeleteOne(`/user/delete?userId=`);
  const [Delete] = useDelete(`/user/delete?userId=`);

  //handling delete student request
  const handleDelete = async (e) => {
    // console.log("delId", e.target.id);
    // console.log("Delete", Delete);
    Delete(e.target.id, setReload);
  };

  // Fetch category data using a custom hook (useFetch)
  const [CityList, error3, loading3] = useFetch("/address/city-list", true);

  return (
    <Home>
      <div className="md:pl-3  p-3 text-white w-[100%] mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium   d-flex justify-between items-center">
            <h1>Students List</h1>
            <div className="">
              <Link
                to="/students/add"
                className="Add-btn py-2 px-3 rounded-md hover:border-none hover:outline-none"
              >
                Add Student
              </Link>
            </div>
          </div>
        </section>

        <div className="w-[100%]">
          {loading && <h1 className="text-white">Loading...</h1>}
          {error && <h1 className="text-white">{error.message}</h1>}

          {data?.data && (
            <>
              <div className="row ">
                <Card title="Total Students" value={totalStudents} />
                <Card
                  title="Organization Students"
                  value={organizationStudents}
                />
                <Card title="Inactive Students" value={inactiveStudents} />
                <Card title="Blocked Students" value={blockedStudents} />
              </div>

              <div className="row">
                <div className="col">
                  <div className="box ">
                    <div className="card-body row">
                      <div className="border-bottom mb-3 border-black">
                        <h4 className="text-white heading">Filters</h4>
                      </div>
                      <div className="col-12 col-sm-3 text-white relative ">
                        <label className="text-white" htmlFor="search">
                          Search
                        </label>
                        <input
                          type="search"
                          className="form-control input focus-within:bg-none focus:border-none outline-none fs-6  w-[100%] text-white"
                          id="search"
                          name="name"
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                          placeholder="Search "
                        />
                      </div>
                      <div className="col-12 col-sm-3 text-white">
                        <label className="text-white" htmlFor="start-date">
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="form-control input focus-within:bg-none focus:border-none outline-none "
                          name="startDate"
                          id="start-date"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12 col-sm-3 text-white">
                        <label className="text-white" htmlFor="end-date">
                          End Date
                        </label>
                        <input
                          type="date"
                          className="form-control input focus-within:bg-none focus:border-none outline-none "
                          id="endDate"
                          placeholder=""
                          onChange={handleChange}
                          name="end-date"
                        />
                      </div>
                      <div className="col-12 col-sm-3 text-white">
                        <label className="text-white" htmlFor="filters">
                          Filters
                        </label>
                        <select
                          id="filters"
                          className="form-select  input focus-within:bg-none focus:bg-none focus-within:border-none outline-none py-[10px]"
                          value={params.filter}
                          onChange={handleChange}
                          name="filter"
                          aria-label=""
                        >
                          <option className="h-100">
                            Open this select menu
                          </option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" w-[100%]">
                <div className=" ">
                  {loading && <h1 className="text-white">Loading...</h1>}
                  {error && <h1 className="text-white">{error.message}</h1>}

                  {data?.data && (
                    <div className="table-responsive Ttable mt-4   overflow-y-auto Table-overflow">
                      <table className=" table-striped  w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Name</th>
                            <th scope="col"> Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">City</th>
                            {/* <th scope="col">D.O.B</th> */}
                            {/* <th scope="col">Start Date</th> */}
                            {/* <th scope="col">Status</th> */}
                            <th scope="col">Enrolled</th>
                            <th scope="col">Wallet</th>

                            <th scope="col">Options</th>
                          </tr>
                        </thead>

                        <tbody className="table-group-divider ">
                          {data?.data?.map((item) => (
                            <tr key={item.id} className="Tbody ">
                              {/* {console.log(item.id)} */}
                              {/* <td className="py-1">
                            <img src="../../images/faces/face1.jpg" alt="image"/>
                          </td> */}
                              <td>{item.sname}</td>
                              <td>{item.smobile}</td>
                              <td> {item.semail}</td>
                              <td>
                                {CityList?.data
                                  ?.filter((elm) => {
                                    return elm.id === item.scity;
                                  })
                                  .map((elm) => {
                                    return (
                                      <>
                                        <div className="" key={elm.id}>
                                          {elm.title}
                                        </div>
                                      </>
                                    );
                                  })}
                              </td>
                              {/* <td>{item.sdob}</td>
                      <td>{item.createdAt}</td> */}
                              {/* <td>{item.status}</td> */}
                              <td>{item.enrollCourse.length}</td>
                              <td>{item.walletAmt}</td>
                              <td className="flex gap-2 items-center justify-center">
                                <Link
                                  className=" px-3 py-2 rounded-md  view-icon"
                                  to={`/students/view/${item.id}`}
                                >
                                  <i className="bi bi-eye-fill"></i>
                                </Link>{" "}
                                <Link
                                  className="px-3 py-2 rounded-md edit-icon"
                                  to={`/students/edit/${item.id}`}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link
                                  className=" px-3 py-2 rounded-md  delete-icon "
                                  onClick={handleDelete}
                                  id={item.id}
                                >
                                  <i id={item.id} className="bi bi-trash3"></i>
                                </Link>{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Home>
  );
}

export default Students;
