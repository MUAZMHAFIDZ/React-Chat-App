import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className="bg-slate-600 bg-opacity-85 w-full mx-3 rounded-lg md:w-1/2 lg:w-1/3 py-3 px-10">
      <div className="container">
        <h1 className="text-transparent text-center p-5 text-3xl bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400">
          <a href="https://muazmhafidz.my.id" target="_Blank">
            MuazChatApp
          </a>
        </h1>

        <form className="w-full m-auto grid gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="">
              <span className="text-sm">Username</span>
            </label>
            <input
              className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
              placeholder="username here"
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <label htmlFor="">
              <span className="text-sm">Password</span>
            </label>
            <input
              className="rounded-md py-2 bg-slate-800 bg-opacity-55 px-4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="password is secret :)"
            />
          </div>
          <Link
            className="cursor-custom text-blue-400 hover:text-blue-500 py-1"
            to={"/signup"}
          >
            {"Don't"} have account?
          </Link>
          <div>
            <button
              className="cursor-custom w-full my-5 rounded-md py-1 text-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-blue-400 hover:bg-gradient-to-tl"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
