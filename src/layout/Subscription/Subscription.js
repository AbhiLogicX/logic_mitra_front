import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useAdd } from "../../hooks/useAdd";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Home from "../../Home";

function Subscription() {
  const SubScriptionUrl = "/subscription";
  const navigate = useNavigate();

  const [params, setparams] = useState({
    city: "",
    position: "",
    fees: "",
    status: "1",
  });
  console.log(
    params.city,
    params.position,

    params.fees,
    params.status
  );
  //handle addition of category
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value, type, files } = event.target;
    setparams({
      ...params,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const [addData] = useAdd(`/subscription/create`);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(params);

    // addData(params);
    try {
      const res = await axios.post("/subscription/create", params);
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res?.data?.message || "Data Created successfully");
        navigate(SubScriptionUrl);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res?.data?.message || "Failed Data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(params);

  // Fetch category data using a custom hook (useFetch)
  const [data, error, loading] = useFetch("/subscription/list", true);

  console.log(data);

  // fetch tha city data
  const [Citydata, error1, loading1] = useFetch("/address/city-list", true);

  console.log(Citydata);

  return (
    <Home>
      <div className="py-3  p-3 text-white w-[100%]  relative mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium ">
            <h1>Subscription List</h1>
            <div className="section-header-breadcrumb"></div>
          </div>
        </section>

        {/* Categories Table */}
        <div className="row space-y-5 lg:space-y-0">
          <div className="col col-lg-7">
            <div className="">
              {/* Display loading message while data is being fetched */}
              {loading && <h1 className="text-white">Loading...</h1>}
              {/* Display error message if there's an error */}
              {error && <h1 className="text-white">{error.message}</h1>}
              {/* Display Category data if available */}
              {data.data && (
                <div className="table-responsive Ttable  h-[550px] overflow-y-auto Table-overflow">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr className="Thead">
                        <th scope="col">City Name</th>
                        <th scope="col">Position</th>

                        <th scope="col">Status</th>
                        <th scope="col">amount</th>

                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data.data.map((item) => (
                        <tr key={item.id} className="Tbody">
                          <td>
                            {Citydata?.data
                              ?.filter((elm) => elm.id === item?.city)
                              .map((elm) => elm.title)}
                          </td>
                          <td>{item?.position}</td>

                          <td>{item?.status === 1 ? "Active " : "Inactive"}</td>
                          <td>{item?.fees}</td>

                          <td className="flex gap-2 items-center justify-center">
                            {/* Action links for each trainer */}
                            <Link
                              className="py-2 px-3 rounded-md edit-icon"
                              to={`/subscription/edit/${item.id}`}
                            >
                              <i class="bi bi-pencil-square"></i>
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
          {data.data && (
            <div className="col-lg-5 lg:px-5">
              <form
                className="box   py-4 shadow-lg  lg:h-50"
                onSubmit={handleSubmit}
              >
                <div className="">
                  <p className="text-white">City Name</p>
                  <select
                    required
                    className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                    onChange={handleChange}
                    name="city"
                    value={params?.city}
                  >
                    <option> select city</option>
                    {Citydata?.data?.map((elm) => {
                      return (
                        <>
                          <option value={elm.id}> {elm.title} </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="">
                  <p className="text-white">Status</p>

                  <div className="d-flex justify-content-start text-white gap-4 align-items-center my-2">
                    <div className=" ">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        value={1}
                        checked={params?.status == 1}
                        onChange={handleChange}
                      />
                      Active
                    </div>

                    <div className="">
                      <input
                        type="radio"
                        id="inactive"
                        value={0}
                        name="status"
                        onChange={handleChange}
                        checked={params?.status == 0}
                      />
                      Inactive
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-white">Position</p>
                  <input
                    onChange={handleChange}
                    required
                    name="position"
                    value={params?.position}
                    placeholder="Position"
                    type="number"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Amount</p>
                  <input
                    onChange={handleChange}
                    required
                    name="fees"
                    value={params?.fees}
                    placeholder="Amount"
                    type="number"
                    className="form-control input focus-within:bg-none border-none outline-none focus:bg-none my-2"
                  />
                </div>

                {/* {similar fields} */}
                <button className="Add-btn px-3 py-2 rounded-md mt-3 w-[100%]">
                  Add Subscription
                </button>
              </form>
            </div>
          )}
        </div>
        {/* Card to show and add subcategories */}
      </div>
    </Home>
  );
}

export default Subscription;
