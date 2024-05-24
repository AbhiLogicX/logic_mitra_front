import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CircleLoader = ({ path = "login" }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => ++count);
    }, 1000);
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      <div className="flex flex-col justify-center items-center py-3 p-3 mb-16 text-white">
        <h1>Varify Admin ...</h1>
        <h1>Rediracting to you in {count} second</h1>
        <button
          className="Add-btn px-3 py-2 rounded-md mt-3 "
          onClick={() => navigate("/login")}
        >
          {" "}
          Please Login Again
        </button>
      </div>
    </>
  );
};

export default CircleLoader;
