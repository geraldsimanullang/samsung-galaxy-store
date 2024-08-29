import { useState } from "react";
import samsung from "../assets/samsung.svg";
import axios from "axios";
import Toastify from "toastify-js";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    try {
      e.preventDefault();

      const { data } = await axios.post("http://geraldsimanullang.site/login", {emailOrUsername, password});

      console.log(data)

      // localStorage.setItem("access_token", data.data.access_token);
      // setPage("home");
      // Toastify({
      //   text: "Login success",
      //   duration: 3000,
      //   newWindow: true,
      //   close: true,
      //   gravity: "bottom", // `top` or `bottom`
      //   position: "right", // `left`, `center` or `right`
      //   stopOnFocus: true, // Prevents dismissing of toast on hover
      //   style: {
      //     background: "#008000",
      //   },
      //   onClick: function () {}, // Callback after click
      // }).showToast();
    } catch (error) {
      console.log(error)
      // Toastify({
      //   text: error.response.data.error,
      //   duration: 3000,
      //   newWindow: true,
      //   close: true,
      //   gravity: "bottom", // `top` or `bottom`
      //   position: "right", // `left`, `center` or `right`
      //   stopOnFocus: true, // Prevents dismissing of toast on hover
      //   style: {
      //     background: "#FF0000",
      //   },
      //   onClick: function () {}, // Callback after click
      // }).showToast();
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={samsung}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={login} method="POST">
            <div>
              <label
                htmlFor="emailOrUsername"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email or Username
              </label>
              <div className="mt-2">
                <input
                  id="emailOrUsername"
                  name="emailOrUsername"
                  required=""
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required=""
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
