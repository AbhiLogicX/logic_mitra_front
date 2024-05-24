import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import Home from "../../Home";

function Trainers() {
  const TrainerUrl = "/trainers";
  const [params, setParams] = useState({
    name: "",
    startDate: "",
    endDate: "",
    filter: "",
  });
  // Fetch trainers data using a custom hook (useFetch)
  const [data, error, loading] = useFetch("/trainers/list", params);

  console.log(data);

  //setting trainers categories count
  const [totalTrainers, setTotalTrainers] = useState(0);
  const [organizationTrainers, setOrganisationTrainers] = useState(0);
  const [inactiveTrainers, setInactiveTrainers] = useState(0);
  const [blockedTrainers, setBlockedTrainers] = useState(0);
  useEffect(() => {
    setTotalTrainers(0);
    setBlockedTrainers(0);
    setInactiveTrainers(0);
    setOrganisationTrainers(0);
    data.data?.map((item) => {
      setTotalTrainers((prevTotal) => prevTotal + 1);
      if (item.status === "blocked") {
        setBlockedTrainers((blockedTrainers) => blockedTrainers + 1);
      } else if (item.status === "1") {
        setOrganisationTrainers(
          (organisationTrainers) => organisationTrainers + 1
        );
      } else if (item.status === "0") {
        setInactiveTrainers((inactiveTrainers) => inactiveTrainers + 1);
      }
    });
  }, [data, params]);

  // Handle changes in filter inputs
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    // console.log(params);
  };

  const { Delete } = useDeleteOne(`/user/delete?trainId=`);

  // Handle deletion of a trainer
  const handleDelete = async (e) => {
    Delete(e.target.id, TrainerUrl);
  };

  //* fetch the city list
  const [CityList, error3, loading3] = useFetch("/address/city-list", true);

  return (
    <Home>
      <div className=" md:pl-3  p-3 text-white w-[100%] mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium   d-flex justify-between items-center">
            <h1>Trainers List</h1>
            <div className="">
              <Link to="/trainers/add" className="px-3 py-2 Add-btn rounded-md">
                Add Trainer
              </Link>
            </div>
          </div>
        </section>

        <div className=" w-[100%]">
          {/* Display loading message while data is being fetched */}
          {loading && <h1 className="text-white">Loading...</h1>}
          {/* Display error message if there's an error */}
          {error && <h1 className="text-white">{error.message}</h1>}
          {/* Display trainers data if available */}

          {data?.data && (
            <>
              {/* Statistics Cards */}

              <div className="row">
                <Card title="Total Trainers" value={totalTrainers} />
                <Card
                  title="Organization Trainers"
                  value={organizationTrainers}
                />
                <Card title="Inactive Trainers" value={inactiveTrainers} />
                <Card title="Blocked Trainers" value={blockedTrainers} />
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
                          className="form-control input focus-within:bg-none border-none outline-none focus:bg-none fs-6  w-[100%] w-100"
                          id="search"
                          name="name"
                          onChange={handleChange}
                          aria-describedby="emailHelp"
                          placeholder="Search"
                        />
                      </div>
                      <div className="col-12 col-sm-3 text-white">
                        <label className="text-white" htmlFor="start-date">
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="form-control input focus-within:bg-none border-none outline-none focus:bg-none "
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
                          className="form-control input focus-within:bg-none border-none outline-none focus:bg-none "
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
                          className="form-select py-2 input focus-within:bg-none border-none outline-none focus:bg-none"
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

              {/* Trainers Table */}
              <div className=" w-100">
                <div className=" ">
                  {/* Display loading message while data is being fetched */}
                  {loading && <h1 className="text-white">Loading...</h1>}
                  {/* Display error message if there's an error */}
                  {error && <h1 className="text-white">{error.message}</h1>}
                  {/* Display trainers data if available */}
                  {data?.data && (
                    <div className="table-responsive Ttable mt-4  overflow-y-auto Table-overflow">
                      <table className=" table-striped w-[100%]">
                        <thead>
                          <tr className="Thead">
                            <th scope="col">Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">City</th>
                            <th scope="col">Courses</th>
                            <th scope="col">Wallet</th>
                            <th scope="col">Options</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {/* Map through trainers data and display in table rows */}
                          {data?.data?.map((item) => (
                            <tr key={item.id} className="Tbody">
                              <td>{item.sname}</td>
                              <td>{item.smobile}</td>
                              <td>{item.semail}</td>
                              <td>{item.sgender}</td>
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
                              <td>{item.courses.length}</td>
                              <td>{item.walletAmt}</td>
                              <td className="flex gap-2 items-center">
                                {/* Action links for each trainer */}

                                <Link
                                  className="py-2 px-3 rounded-md  view-icon"
                                  to={`/trainers/view/${item.id}`}
                                >
                                  <i className="bi bi-eye-fill"></i>
                                </Link>
                                <Link
                                  className="py-2 px-3 rounded-md edit-icon"
                                  to={`/trainers/edit/${item.id}`}
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link
                                  id={item.id}
                                  className="py-2 px-3 rounded-md  delete-icon"
                                  onClick={handleDelete}
                                >
                                  <i id={item.id} className="bi bi-trash3"></i>
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
            </>
          )}
        </div>
      </div>
    </Home>
  );
}

export default Trainers;
