import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  axios.defaults.baseURL = "http://localhost:8000/api/";
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("admin");
    if (data) {
      const user = JSON.parse(data);
      console.log(user);
      setAuth({
        ...auth,
        user: user.userId,
        token: user.token,
      });
      // console.log(auth);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
