import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const updateUser = async ({ fullName, gender }) => {
    const success = handleInputErrors({ fullName, gender });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/users/setting", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({
          fullName,
          gender,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));

      setAuthUser(data);

      navigate("/");
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateUser };
};

export default useUpdateUser;

const handleInputErrors = ({ fullName, gender }) => {
  if (!fullName || !gender) {
    toast.error("Fill all fields!");
    return false;
  }
  return true;
};
