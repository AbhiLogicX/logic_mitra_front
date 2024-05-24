import React, { useState } from "react";
import { UseCourseContext } from "../../context/CourseContext";
import { useFetch } from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { UsesubcategoriesContext } from "../../context/SubcatContext";
import { useAdd } from "../../hooks/useAdd";
import swal from "sweetalert";
import axios from "axios";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import Home from "../../Home";

const SubModule = () => {
  //*find the modules id through params

  const { id } = useParams();
  const SubModuleId = id;

  // todo find the url path to redirect the page

  const Url = window.location.href;
  const SubModuleUrl = Url.substring(Url.indexOf("/courses/"));

  const { moduleId, setModuleId } = UseCourseContext();
  const { courseId, setCourseId, trainerId, setTrainerId } =
    UsesubcategoriesContext();
  const [data, error, loading] = useFetch(
    `/course-detail/course-submodule?moduleId=${moduleId}`,
    moduleId
  );

  const [params, setParams] = useState({
    title: "",
    description: "",
    duration: "",
    fileUrl: "",
    videoUrl: "",
    sequence: "",
    trainer: trainerId,
    course: courseId,
    module: moduleId,
    status: "1",
  });
  console.log(params);
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value, files, type } = event.target;
    setParams({
      ...params,
      [name]: value,
    });
  };
  const [addData] = useAdd(`/course-detail/create-submodule`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    addData(params, SubModuleUrl);
    console.log(params);
  };
  const { Delete } = useDeleteOne(
    `/course-detail/delete-submodule?submoduleId=`
  );
  const handleDelete = async (e) => {
    Delete(e.target.id, SubModuleUrl);
  };

  console.log(moduleId);
  console.log(data);
  return (
    <Home>
      <div className="pl-3  p-md-3 text-white w-[100%]  relative">
        <section className="section py-3">
          <div className="text-xl font-medium">
            <h1>Sub Module List</h1>
            <div className="section-header-breadcrumb"></div>
          </div>
        </section>

        {/* Categories Table */}
        <div className="row  space-y-5 lg:space-y-0">
          <div className="col col-lg-7">
            <div className=" ">
              {/* Display loading message while data is being fetched */}
              {loading && <h1 className="text-white">Loading...</h1>}
              {/* Display error message if there's an error */}
              {error && <h1 className="text-white">{error.message}</h1>}
              {/* Display trainers data if available */}
              {data.data && (
                <div className="table-responsive Ttable ">
                  <table className=" table-striped w-[100%]">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Duration</th>

                        <th scope="col">Status</th>
                        <th scope="col">Sequence</th>

                        <th scope="col">Options</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {/* Map through trainers data and display in table rows */}
                      {data?.data.map((item) => (
                        <tr key={item.title} className="Tbody">
                          <td>{item.title}</td>
                          <td>{item.duration}</td>

                          <td>{item.status === 1 ? "Active " : "Inactive"}</td>
                          <td>{item.sequence}</td>

                          <td className="flex gap-2 items-center">
                            {/* Action links for each trainer */}
                            <Link
                              id={item.id}
                              className=" py-2 px-3 rounded-md bg-danger "
                              onClick={handleDelete}
                            >
                              <i id={item.id} className="bi bi-trash3"></i>
                            </Link>{" "}
                            <Link
                              className="py-2 px-3 rounded-md bg-warning"
                              to={`${SubModuleUrl}/edit/${item.id}`}
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
          {data?.data && (
            <div className="col-lg-5 lg:px-5">
              <form
                className="box   py-4 shadow-lg  lg:h-50"
                onSubmit={handleSubmit}
              >
                <div className="">
                  <p className="text-white">Title</p>
                  <input
                    onChange={handleChange}
                    required
                    name="title"
                    value={params?.title}
                    type="text"
                    className="form-control my-2"
                  />
                </div>

                <div className="">
                  <p className="text-white">File Url</p>
                  <input
                    value={params?.fileUrl}
                    onChange={handleChange}
                    required
                    name="fileUrl"
                    type="url"
                    className="form-control my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Video Url</p>
                  <input
                    value={params?.videoUrl}
                    onChange={handleChange}
                    required
                    name="videoUrl"
                    type="url"
                    className="form-control my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Duration</p>
                  <input
                    value={params?.duration}
                    onChange={handleChange}
                    required
                    name="duration"
                    type="text"
                    className="form-control my-2"
                  />
                </div>

                <div className="">
                  <p className="text-white">Status</p>

                  <div className="d-flex justify-content-start text-white gap-4 align-items-center my-2">
                    <div className=" ">
                      <input
                        defaultChecked
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
                  <p className="text-white">Sequence</p>
                  <input
                    onChange={handleChange}
                    required
                    name="sequence"
                    value={params?.sequence}
                    type="number"
                    className="form-control my-2"
                  />
                </div>
                <div className="">
                  <p className="text-white">Description</p>
                  <textarea
                    type="text"
                    required
                    className="form-control my-2"
                    value={params?.description}
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* {similar fields} */}
                <button className="btn btn-primary mt-3 w-[100%]">
                  Add Sub Module
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Home>
  );
};

export default SubModule;
