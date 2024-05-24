import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { toast } from "react-toastify";

const useUpdate = (updateUrl) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (id, updateData, redirectUrl) => {
    //functon to update data
    try {
      setLoading(true);
      const res = await axios.put(`${updateUrl}?${id}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(res?.data?.message || "Data updated Successfully");
        navigate(redirectUrl);
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error("An error occurred");
    }
  };

  return [handleUpdate, loading, error];
};

export default useUpdate;
