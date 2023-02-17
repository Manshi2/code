import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import dr from "../../photo/Rectangle 3829.png";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(process.env.REACT_APP_API_URL + "/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    if (response.status == "success") {
      localStorage.setItem("token", response.token);
      navigate('/admin/dashboard');
    } else {
      alert(response.msg || 'Failed to login');
    }
  };

  const onLoginSuccess = async (res) => {
    console.log("Login Success:", res.profileObj);
    const name = res.profileObj.name;
    const email = res.profileObj.email;
    const phone = " ";
    const password = "Google SignIn";
    const data = { name, email, phone, password };
    console.log(data);
    let res1 = await fetch(process.env.REACT_APP_API_URL + "/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response1 = await res1.json();

    if (response1.success) {
      localStorage.setItem("token", response1.token);
      localStorage.setItem("name", response1.name);
      localStorage.setItem("email", response1.email);
      localStorage.setItem("phone", response1.phone);
      alert("You are successfully logged in");
    } else {
      alert(response1.error);
    }
    // router.reload()
  };

  return (
    <div className="mx-auto flex w-2/3 max-h-fit rounded-xl border my-10 shawdow-2xl">
      <div className="hidden h-full w-full text-right md:block">
        <div className="relative ">
          <img src={dr} />
        </div>
      </div>
      <div className="w-full p-2">
        <p className="text-lg text-gray-400 pt-2 flex">
          {" "}
          {/* <AiOutlineLeft className="pt-1 w-6 h-6 text-gray-400" /> Back{" "} */}
        </p>
        <h2 className="text-4xl font-bold text-[#E94C60] pt-10 pl-4">
          {" "}
          Account Login
        </h2>
        <p className="text-lg text-gray-400 pt-4 pl-4">
          If you are already a member you can login with the email address and
          password
        </p>

        <form onSubmit={handleSubmit} method="POST">
          <div className="relative my-0 mx-4  flex flex-wrap lg:my-8 ">
            <label htmlFor="email" className="text-grey font-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="relative w-full rounded border bg-white px-2 py-3 pr-10 text-[#E94C60] placeholder-orange-500 shadow-md outline-none focus:border-orange-500"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <span className="absolute right-0 flex h-full items-center justify-center  rounded bg-transparent pr-3 pt-4 text-center text-base font-normal leading-snug text-[#E94C60]">
              <i className="fa fa-envelope text-lg text-[#E94C60]"></i>
            </span>
          </div>

          <div className="relative mx-4 flex flex-wrap">
            <label htmlFor="password" className="text-grey font-semibold">
              Password
            </label>
            <input
              type="password"
              className="relative w-full rounded border bg-white px-2 py-3 pr-10 text-[#E94C60] placeholder-orange-500 shadow-md outline-none focus:border-orange-500"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span className="absolute right-0 flex h-full items-center justify-center  rounded bg-transparent pr-3 pt-4 text-center text-base font-normal leading-snug text-[#E94C60]">
              <i className="fa fa-lock text-lg text-[#E94C60]"></i>
            </span>
          </div>

          <div className="mt-4 text-center mx-10 pt-10">
            <button
              type="submit"
              className="w-full rounded-md border-2 bg-[#E94C60] px-12 text-center text-white shadow lg:py-2"
            >
              LOG IN
            </button>
          </div>
        </form>

        <div className="my-5 mx-4 ">
          <p className="mx-5 flex-grow-0 text-center font-semibold dark:text-white">
            {" "}
            Or sign up with{" "}
          </p>
        </div>

        {/* <div className="flex justify-center">
          <GoogleLogin
            clientId="299243138773-tfgmre87vs61qt3ct3tf75nml2ftvl6k.apps.googleusercontent.com"
            onSuccess={onLoginSuccess}
            cookiePolicy={"single_host_origin"}
            className="text-center w-10 rounded-full text-2xl font-semibold"
            loggedIn={true}
          >
            <p></p>
          </GoogleLogin>
        </div> */}
        {/* <p className="text-md text-center pt-4">
          Don’t have an account ?
          <span className="text-[#E94C60] pl-2">
            <Link to="/signUp">Sign up </Link>{" "}
          </span>{" "}
          here
        </p> */}
      </div>
    </div>
  );
};
export default Login;
