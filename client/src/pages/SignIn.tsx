import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div>
      <form action="" className="flex flex-col gap-3 max-w-sm mx-auto mt-20 text-[#EEF4ED] ">
        <h1 className="text-3xl font-bold text-center text-[#0B2545]">Sign in</h1>
        <input type="text" placeholder="Email" className="p-2 outline-[#EEF4ED] rounded-lg" />
        <input type="email" placeholder="Password" className="p-2 outline-[#EEF4ED] rounded-lg" />
        <button className="bg-[#0B2545] p-2 rounded-lg text-[#EEF4ED] hover:opacity-80">Sign in</button>
        <div className=" flex gap-2 items-center justify-between before:content-[''] before:block before:h-[1px] before:bg-[#0B2545] before:w-full after:content-[''] after:block after:h-[1px] after:bg-[#0B2545] after:w-full">or</div>
        <button className=" p-2 rounded-lg bg-red-500 hover:opacity-80" type="button">
          Sign in with Google
        </button>
        <p className="text-[#0B2545]">
          Don't have an account?
          <Link to={"/sign-up"} className="ml-1 text-red-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
