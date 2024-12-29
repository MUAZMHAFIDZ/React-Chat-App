import React, { useState } from "react";
import Gender from "../signup/Gender";
import { FiSave, FiArrowLeft, FiSettings, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useUploadPhoto from "../../hooks/useUploadProfile.js";

const Setting = () => {
  const { authUser } = useAuthContext();
  const inputs = {
    fullName: authUser.fullName,
    username: authUser.username,
    photoProfile: authUser.photoProfile,
    gender: authUser.gender,
  };

  const [onEdit, setOnEdit] = useState("none");

  return (
    <div className="bg-slate-500 bg-opacity-95 w-full mx-3 rounded-lg md:w-1/2 lg:w-1/3 py-3 px-10">
      <Link to={"/"}>
        <button className="cursor-custom w-fit px-8 py-1 rounded-md bg-red-600 hover:bg-red-500">
          <FiArrowLeft />
        </button>
      </Link>
      {onEdit == "none" ? (
        <MyProfile inputs={inputs} setOnEdit={setOnEdit} />
      ) : onEdit == "profile" ? (
        <SettingProfile myInput={inputs} setOnEdit={setOnEdit} />
      ) : (
        <UploadImage
          setOnEdit={setOnEdit}
          photoProfile={
            inputs.photoProfile != ""
              ? `http://localhost:5000${inputs.photoProfile}`
              : "./public/test.jpeg"
          }
        />
      )}
    </div>
  );
};

export default Setting;

const SettingProfile = ({ myInput, setOnEdit }) => {
  const [inputs, setInputs] = useState({
    fullName: myInput.fullName,
    gender: myInput.gender,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await lalala(inputs);
  };

  const handleGender = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  return (
    <form className="w-full m-auto grid gap-2 mt-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 py-2">
        <p className="text-sm">Username {"(Credentials can't Edit)"}</p>
        <p className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4">
          {myInput.username}
        </p>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <label htmlFor="">
          <span className="text-sm">FullName</span>
        </label>
        <input
          className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
          value={inputs.fullName}
          onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          type="text"
          placeholder="full Name here"
        />
      </div>
      <Gender onHandleGender={handleGender} selectedGender={inputs.gender} />
      <div className="flex justify-evenly">
        <button
          type="submit"
          className="cursor-custom w-fit px-10 my-5 rounded-md py-1 text-xl bg-blue-600 hover:bg-blue-500"
          // disabled={loading}
        >
          <FiSave />
        </button>
        <button
          type="button"
          onClick={() => setOnEdit("none")}
          className="cursor-custom w-fit px-10 my-5 rounded-md py-1 bg-red-600 hover:bg-red-500"
        >
          <FiArrowLeft />
        </button>
      </div>
    </form>
  );
};

const MyProfile = ({ inputs, setOnEdit }) => {
  return (
    <div className="w-full m-auto grid gap-2 mt-2">
      <div className="flex justify-center">
        <div className="w-20 border border-slate-700 rounded-full overflow-hidden object-cover mx-2 h-20">
          {inputs.photoProfile !== "" ? (
            <img src={`http://localhost:5000${inputs.photoProfile}`} alt="" />
          ) : (
            <img src="./public/test.jpeg" alt="" />
          )}
        </div>
        <button className="cursor-custom" onClick={() => setOnEdit("aaa")}>
          <FiSettings />
        </button>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <p className="text-sm">Username</p>
        <p className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4">
          {inputs.username}
        </p>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <p className="text-sm">FullName</p>
        <p className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4">
          {inputs.fullName}
        </p>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <p className="text-sm">gender</p>
        <p className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4">
          {inputs.gender}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setOnEdit("profile")}
          className="cursor-custom w-fit px-10 my-5 rounded-md py-1 text-xl bg-blue-600 hover:bg-blue-500"
        >
          <FiSettings />
        </button>
      </div>
    </div>
  );
};

const UploadImage = ({ setOnEdit, photoProfile }) => {
  const { loading, uploadPhoto } = useUploadPhoto();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(e.target.files[0]);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await uploadPhoto(file);
    if (success) {
      setFile(null);
    }
  };

  return (
    <div className="m-3">
      <div className="row-span-2 m-2 flex justify-center">
        <div className="w-24 border border-slate-700 rounded-full overflow-hidden object-cover mx-2 h-24">
          {imagePreview ? (
            <img src={imagePreview} alt="" />
          ) : (
            <img src={photoProfile} alt="" />
          )}
        </div>
      </div>
      <form className="m-2" onSubmit={handleSubmit}>
        <div>
          <div className="flex justify-center">
            <label className="px-5 py-3 my-1 bg-gradient-to-r from-lime-500 to-blue-500 hover:bg-gradient-to-l rounded-lg cursor-custom">
              Upload Photo
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-evenly">
          <button
            disabled={loading}
            type="submit"
            className="cursor-custom w-fit px-10 my-5 rounded-md py-1 text-xl bg-blue-600 hover:bg-blue-500"
          >
            {loading ? <FiLoader /> : <FiSave />}
          </button>
          <button
            type="button"
            onClick={() => setOnEdit("none")}
            className="cursor-custom w-fit px-10 my-5 rounded-md py-1 bg-red-600 hover:bg-red-500"
          >
            <FiArrowLeft />
          </button>
        </div>
      </form>
    </div>
  );
};
