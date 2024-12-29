import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useUploadPhoto = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const uploadPhoto = async (photoProfile) => {
    if (!photoProfile) {
      toast.error("Please select a file.");
      return false;
    }

    if (photoProfile.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB.");
      return false;
    }

    const formData = new FormData();
    formData.append("photoProfile", photoProfile);

    setLoading(true);
    try {
      const res = await fetch("/api/users/setting/photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload photo.");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));

      setAuthUser(data);

      navigate("/");
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, uploadPhoto };
};

export default useUploadPhoto;
