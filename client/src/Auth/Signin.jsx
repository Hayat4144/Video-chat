import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, toastifyoption } from "../globalConfig";
import { useNavigate } from "react-router-dom";
import Decode_token from "../Component/Decode_token";
import { useDispatch } from "react-redux";
import { SETUSER } from "../Context/Actions/ActionType";

function Signin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showPassword1, setshowpassword1] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SubmitHandler = async () => {
    setisLoading(true);
    let url = `${BASE_URL}/v8/user/sign_in?email=${username}&password=${password}`;
    const signup_response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const { data, error, token } = await signup_response.json();
    setisLoading(false);
    if (signup_response.status !== 200)
      return toast.error(error, toastifyoption);
    const decodetoken = Decode_token(token);
    dispatch({ type: SETUSER, payload: decodetoken });
    localStorage.setItem("islogdin", true);
    localStorage.setItem("token", token);
    toast.success(data, toastifyoption);
    navigate("/");
  };

  return (
    <Fragment>
      <main className="singin page">
        <h1 className="text-center font-bold text-3xl my-5 md:my-10">
          Sign into your account
        </h1>
        <div
          className="sm:mx-auto sm:w-[50%] mt-4 xl:mx-auto xl:w-[30%]  
                lg:mx-auto lg:w-[25%] signin-form border md:w-[50%] md:m-auto border-gray-300 
                shadow-lg rounded-md  mx-3 mb-2"
        >
          <form
            className="form px-2"
            onSubmit={(e) => {
              e.preventDefault();
              SubmitHandler();
            }}
          >
            <div className="user_name_field my-1">
              <label className="block py-1 text-gray-700">Email</label>
              <input
                value={username}
                onChange={(e) => setusername(e.target.value)}
                type="text"
                className="border border-gray-300 focus:border focus:border-blue-600 
                px-4 py-1 outline-none rounded-md w-full"
                placeholder="enter your username"
              />
            </div>
            <div className="password_field my-1">
              <label className="block py-1 text-gray-700">password</label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={showPassword1 ? "text" : "password"}
                className="border border-gray-300 rounded-md my-2 py-[8px] 
                w-full focus:border-blue-600 focus:ring-blue-700 bg-inherit 
                focus:border  px-2 outline-none text-sm text-gray-700
                placeholder:text-gray-500"
                placeholder="Enter your password"
              />
              <span
                className="text-sm mr-1 cursor-pointer relative float-right bottom-9 
                right-1"
                onClick={() => setshowpassword1(!showPassword1)}
              >
                {showPassword1 ? " hide" : "show"}
              </span>
            </div>
            <div className="buttons my-3">
              {!isLoading ? (
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 w-full
                    text-white rounded-md outline-none focus:border focus:border-blue-700 focus:bg-transparent focus:text-black"
                >
                  Sing in
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex 
                 items-center justify-center py-2 mb-5 leading-4 text-sm shadow rounded-md
                 text-white bg-indigo-800 hover:bg-indigo-900
                 w-full text-center transition ease-in-out duration-150 cursor-not-allowed"
                  disabled=""
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="pacity-25 text-white"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 
                      018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing ...
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </Fragment>
  );
}

export default Signin;
