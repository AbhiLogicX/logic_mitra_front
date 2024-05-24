import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import swal from "sweetalert";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import useUpdate from "../../hooks/useUpdate";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import Home from "../../Home";

function EditStudentInfo() {
  const StudentUrl = "/students";
  // Extracts student ID from URL parameters
  const { id } = useParams();
  // Fetch student data using a custom hook (useFetch)

  const [Fetch, data, loading, error] = useFetchOnce(`/user/details?`, true);
  console.log(data);
  // State to store form parameters
  const [params, setParams] = useState();

  // Updates params when data is fetched
  useEffect(() => {
    Fetch(`userID=${id}`);
  }, []);

  useEffect(() => {
    if (data.data) {
      setParams(data.data);
    }
  }, [data]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter
    const { name, type, value, files } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/user/update-user`);
  // Handles form submission
  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("image", params.sprofilepicUrl);
    formdata.append("banner-image", params.sbackgroundUrl);
    console.log(e);
    e.preventDefault();
    // Calls the handleUpdate function from the custom hook
    handleUpdate(`userId=${e.target.id}`, params, StudentUrl);
  };

  console.log(params);

  // fetching all country , state, and country data for showing on dropdown

  const [Citydata, error1, loading1] = useFetch("/address/city-list", true);

  const [Countrydata, error2, loading2] = useFetch(
    "/address/country-list",
    true
  );

  const [Statedata, error3, loading3] = useFetch("/address/state-list", true);

  // choose the city after state and coutnry clicked

  useEffect(() => {
    const fetchcitydata = async () => {
      try {
        const res = await axios.get(
          `/address/city-detail?cityID=${params?.scity}`
        );
        const data = res.data;
        console.log(data?.data?.state);

        const datastate = Statedata?.data?.filter(
          (elm) => elm.id === data?.data?.state
        );
        console.log(datastate);
        const UniquStatename = datastate.map((elm) => elm.title);
        console.log(...UniquStatename);

        setParams((predata) => ({
          ...predata,
          sstate: UniquStatename.toString(),
        }));

        console.log(datastate);
      } catch (error) {
        console.log(error);
      }
    };

    fetchcitydata();
  }, [params?.scity]);

  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {data.data && (
          <div className=" py-3 p-3 mb-16">
            <section className="section py-3">
              <div className="text-xl font-medium text-white  d-flex justify-between items-center">
                <h1> Edit Students Details</h1>
              </div>
            </section>
            <form
              className="forms-sample w-100  p-4 box"
              onSubmit={handleSubmit}
            >
              <div className="w-100 d-flex ">
                <div className="form-group  row items-center">
                  <div className="col-12 col-sm-4 items-center">
                    <label
                      className="text-white"
                      htmlFor="exampleInputUsername1"
                    >
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sname"
                      value={params?.sname}
                      placeholder="Student Name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Gender *
                    </label>

                    <select
                      className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      value={params?.sgender}
                      name="sgender"
                      onChange={handleChange}
                      required
                    >
                      <option>Select gender</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputEmail1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="semail"
                      value={params?.semail}
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputMobile">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="spassword"
                      value={params?.spassword}
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputMobile">
                      Mobile *
                    </label>
                    <input
                      type="tel"
                      placeholder="Mobile no."
                      maxLength={10}
                      minLength={10}
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="smobile"
                      value={params?.smobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputMobile">
                      Whatsapp
                    </label>
                    <input
                      type="tel"
                      placeholder="Whatsapp no."
                      maxLength={10}
                      minLength={10}
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="swhatsapp"
                      value={params?.swhatsapp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sdob"
                      value={params?.sdob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Status
                    </label>
                    <select
                      onChange={handleChange}
                      value={params?.status}
                      name="status"
                      className="form-select  input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                    >
                      <option>Open Select</option>

                      <option value={1}>Active</option>
                      <option value="blocked">Blocked</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Country *
                    </label>

                    <select
                      className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                      onChange={handleChange}
                      name="scountry"
                      value={params?.scountry}
                      required
                    >
                      <option> Select country</option>
                      {Countrydata?.data?.map((elm) => {
                        return (
                          <>
                            <option value={elm.title}> {elm.title} </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      State *
                    </label>

                    <select
                      className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                      onChange={handleChange}
                      name="sstate"
                      value={params?.sstate}
                      required
                    >
                      <optoin>Select state</optoin>
                      {Statedata?.data?.map((elm) => {
                        return (
                          <>
                            <option value={elm.title}> {elm.title} </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      City *
                    </label>

                    <select
                      className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2 py-[10px]"
                      onChange={handleChange}
                      name="scity"
                      value={params?.scity}
                      required
                    >
                      <option> Select city</option>
                      {Citydata?.data?.map((elm) => {
                        console.log(elm.id);
                        return (
                          <>
                            <option value={`${elm.id}`}> {elm.title} </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="saddress"
                      value={params?.saddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Pin Code *
                    </label>
                    <input
                      type="number"
                      required
                      max={6}
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="spincode"
                      value={params?.spincode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Verified
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="varified"
                      value={params?.varified}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Profile Pic
                    </label>
                    <input
                      type="file"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sprofilepicUrl"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Background Image
                    </label>
                    <input
                      type="file"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sbackgroundUrl"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Level of Education *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="levelOfeducation"
                      value={params?.levelOfeducation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Pass Out Year *
                    </label>
                    <input
                      type="number"
                      required
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="passOutYear"
                      value={params?.passOutYear}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Fcm
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="sfcm"
                      value={params?.sfcm}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Lattitude
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="slattitude"
                      value={params?.slattitude}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="text-white" htmlFor="exampleInputDOB">
                      Longitude
                    </label>
                    <input
                      type="text"
                      className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                      name="slongitude"
                      value={params?.slongitude}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit and cancel buttons */}

                  <div className="flex items-center justify-between mt-3">
                    <button
                      type="submit"
                      className="py-2 my-2 Add-btn sm:px-4  px-5 rounded-md"
                      id={params?.id || ""}
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                    <Link to={`/students`}>
                      <button className="py-2 my-2 Cancel-btn sm:px-4  px-5 rounded-md">
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Home>
    </>
  );
}

export default EditStudentInfo;
