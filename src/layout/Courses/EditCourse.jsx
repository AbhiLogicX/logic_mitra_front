import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import swal from "sweetalert";
import Home from "../../Home";

function EditCourses() {
  const CourseUrl = "/courses";
  const { id } = useParams();

  const courseId = id;

  const [data, error, loading] = useFetch(
    `/courses/course-detail?courseId=${courseId}`,
    courseId
  );
  //create a state to store all the data that will be sent with request
  const [formData, setFormData] = useState({
    ctitle: "",
    cstatus: "",
    cduration: "",
    cdescription: "",
    cthumbnail: null,
    cdemovideo: null,
    ccoverimage: null,
    ckeywords: "",
    cfees: "",
    cofferfees: "",
  });

  //when the data is fetched set it to the form data
  useEffect(() => {
    if (data) {
      setFormData(data.data);
    }
  }, [data, loading, error]);
  //create a functon to handle the change of the data
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/courses/update-course`);

  // console.log(formData.ctitle)
  //create a function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("images", formData.ccoverimage);
    formdata.append("thumbanil", formData.cthumbnail);
    formdata.append("video", formData.cdemovideo);

    // Calls the handleUpdate function from the custom hook
    handleUpdate(`courseId=${e.target.id}`, formData, CourseUrl);
    // console.log("form submitted", formData);
  };

  console.log(formData);
  return (
    <>
      <Home>
        {/* Display loading message while data is being fetched */}
        {loading && <h1 className="text-white">Loading...</h1>}
        {/* Display error message if there's an error */}
        {error && <h1 className="text-white">{error.message}</h1>}
        {/* Display trainers data if available */}
        {!data.data ? (
          <>loading...</>
        ) : (
          <>
            <div className="w-100 py-3 p-3 mb-16">
              <section className="section py-3">
                <div className="text-xl font-medium text-white  d-flex justify-between items-center">
                  <h1> Edit Course Details</h1>
                </div>
              </section>
              <form
                // Form for Adding Course information
                className="forms-sample   p-4 box"
                onSubmit={handleSubmit}
                id={formData?.id}
              >
                {/* Form inputs for course details */}
                <div className="w-100 d-flex gap-3">
                  {/* Form group for coursename*/}
                  <div className="form-group  row">
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Title
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={formData?.ctitle}
                        name="ctitle"
                        placeholder="Course Title"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Status
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={formData?.cstatus}
                        name="cstatus"
                        placeholder="Course Status"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Duration
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={formData?.cduration}
                        name="cduration"
                        placeholder="Course Duration"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Fees
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={formData?.cfees}
                        name="cfees"
                        placeholder="Course Fees"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Offer Fees
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        value={formData?.cofferfees}
                        name="cofferfees"
                        placeholder="Course Offer Fees"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Thumbnail
                      </label>
                      <input
                        type="file"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cthumbnail"
                        placeholder="Course Duration"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Cover Image
                      </label>
                      <input
                        type="file"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="ccoverimage"
                        placeholder="Course Cover Image"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="coll-12 col-sm-4">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Demo Video
                      </label>
                      <input
                        type="file"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="cdemovideo"
                        placeholder="Course Demo Video"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Keywords
                      </label>
                      <input
                        type="text"
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        name="ckeywords"
                        value={formData?.ckeywords}
                        placeholder="Course keywords"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 w-[100%]">
                      <label
                        className="text-white"
                        htmlFor="exampleInputUsername1"
                      >
                        Course Discription
                      </label>
                      <textarea
                        name="cdescription"
                        value={formData?.cdescription}
                        id=""
                        className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit and cancel buttons */}

                <div className="flex items-center justify-between mt-3">
                  <button
                    type="submit"
                    className="rounded-md py-2 Add-btn px-4"
                  >
                    Update
                  </button>
                  <button
                    type="reset"
                    className="rounded-md py-2 Cancel-btn px-4"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </Home>
    </>
  );
}

export default EditCourses;
