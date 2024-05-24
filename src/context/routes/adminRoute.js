import React from "react";
import { useState } from "react";
// import { useAuth } from "../context/auth";
import { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth";
import CircleLoader from "../../components/CircleLoader";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  console.log("auth at admin route", auth);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:8000/api/user/admin-auth");
      if (res.status === 200) {
        console.log("admin res", res);
        setOk(true);
      } else {
        console.log("admin res err", res);
        setOk(false);
      }
    };
    if (auth.user !== null) authCheck();
  }, [auth]);
  return ok ? <Outlet /> : <CircleLoader path="" />;
};

export default AdminRoute;
