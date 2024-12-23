import { Link } from "react-router-dom";
import Gender from "./Gender";
import { useEffect, useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleGender = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="bg-slate-600 bg-opacity-85 w-full mx-3 rounded-lg md:w-1/2 lg:w-1/3 py-2 px-10">
      <div className="container">
        <h1 className="text-transparent text-center p-2 text-3xl bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400">
          <a href="https://muazmhafidz.my.id" target="_Blank">
            MuazChatApp
          </a>
        </h1>

        <form
          className="w-full max-h-[100vh] m-auto grid gap-1"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 py-2">
            <label htmlFor="">
              <span>Full Name</span>
            </label>
            <input
              className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              type="text"
              placeholder="username here"
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="">
              <span>Username</span>
            </label>
            <input
              className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              type="text"
              placeholder="username here"
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="">
              <span>Password</span>
            </label>
            <input
              className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type="password"
              placeholder="password is secret :)"
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="">
              <span>Confirm Password</span>
            </label>
            <input
              className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm Password. dun forget OK :v"
            />
          </div>
          <Gender
            onHandleGender={handleGender}
            selectedGender={inputs.gender}
          />
          <Link className="text-blue-400 hover:text-blue-500" to={"/login"}>
            I have account
          </Link>
          <div>
            <button
              className="w-full my-5 rounded-md py-1 text-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-400 hover:bg-gradient-to-tl"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
