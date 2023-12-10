import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

function SignUp() {
  const { isError, isLoading, handleChange, handleClick } = useSignUp();
  return (
    <div>
      <form action="" className="flex flex-col gap-3 max-w-sm mx-auto mt-20 text-[-[#0B2545] ">
        <h1 className="text-3xl font-bold text-center text-[#0B2545]">Sign up</h1>
        <input type="text" placeholder="Username" className="p-2 outline-[#EEF4ED] rounded-lg" onChange={handleChange} name="username" />
        <input type="email" placeholder="Email" className="p-2 outline-[#EEF4ED] rounded-lg" onChange={handleChange} name="email" />
        <input type="password" placeholder="Password" className="p-2 outline-[#EEF4ED] rounded-lg" onChange={handleChange} name="password" />
        <button disabled={isLoading} onClick={handleClick} className="bg-[#0B2545] p-2 rounded-lg text-[#EEF4ED] disabled:opacity-25 hover:opacity-80">
          {isLoading ? "Loading..." : "Sign up"}
        </button>
        <div className=" flex gap-2 items-center justify-between before:content-[''] before:block before:h-[1px] before:bg-[#0B2545] before:w-full after:content-[''] after:block after:h-[1px] after:bg-[#0B2545] after:w-full">or</div>
        <button className=" p-2 rounded-lg bg-red-500 hover:opacity-80  text-[#EEF4ED]" type="button">
          Sign in with Google
        </button>
        <p className="text-[#0B2545]">
          have an account?
          <Link to={"/sign-in"} className="ml-1 text-blue-900">
            Sign in
          </Link>
        </p>
        {isError && <p className="text-red-500">{isError}</p>}
      </form>
    </div>
  );
}

export default SignUp;
