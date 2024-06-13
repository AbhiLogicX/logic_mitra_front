import React, { useState } from "react";
// import Home from "../../Home";
import { toast } from "react-toastify";
import axios from "axios";
// import { Email } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  // w-[100%]
  const [auth, setAuth] = useAuth();
  const [semail, setEmail] = useState("");
  const [spassword, setPassword] = useState("");
  const [userType, setTrainer] = useState("trainer");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!semail || !spassword) {
      toast.warn("Fill All fields!!");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/trainer-login",
        {
          semail,
          spassword,
          userType,
        }
      );
      if (data?.response === "success") {
        //console.log("data at form", data);
        setAuth({ ...data.data });
        toast.success("Login Successfull");
        localStorage.setItem("admin", JSON.stringify(data?.data));
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      // //console.log(error);
      toast.error("Something Went Wrong!!");
      setLoading(false);
    }
  };
  return (
    <>
      <section className="flex flex-col justify-center items-center py-3 p-3 mb-16">
        <section className="section py-3">
          <div className="text-xl font-medium text-white  d-flex justify-between items-center">
            <h1>Login As Admin</h1>
          </div>
        </section>
        <div className="box text-white p-3 w-[500px]">
          <div className="space-y-3">
            <div className="space-y-2">
              <p> Email</p>
              <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={semail}
                placeholder="Email"
                className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
              />
            </div>
            <div className="space-y-2">
              <p> Password</p>
              <input
                required
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={spassword}
                placeholder="Password"
                className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
              />
            </div>

            <button
              className="Add-btn px-3 py-2 rounded-md mt-3 "
              onClick={handleLogin}
            >
              {" "}
              {loading ? "loading..." : "Login"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
