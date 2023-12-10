import { useState } from "react";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../libs/api";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function SignIn() {
  const [resMessage, setResMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: FieldValues) => {
    console.log(data);
    try {
      const res = await api.post("/sign-in", data);
      console.log(res.data);
      setResMessage(res.data.message);
      reset();
    } catch (err: any) {
      setResMessage(err.response.data.message);
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-3 max-w-sm mx-auto mt-20 text-[#EEF4ED] ">
        <h1 className="text-3xl font-bold text-center text-[#0B2545]">Sign in</h1>
        <input {...register("email")} placeholder="Email" className="p-2 text-[#0B2545] outline-[#EEF4ED] rounded-lg" />
        {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
        <input {...register("password")} type="password" placeholder="Password" className="p-2 text-[#0B2545] outline-[#EEF4ED] rounded-lg" />
        {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
        <button disabled={isSubmitting} className="bg-[#0B2545] p-2 rounded-lg disabled:opacity-50 text-[#EEF4ED] hover:opacity-80">
          Sign in
        </button>
        <div className=" flex gap-2 items-center justify-between before:content-[''] before:block before:h-[1px] before:bg-[#0B2545] before:w-full after:content-[''] after:block after:h-[1px] after:bg-[#0B2545] after:w-full">or</div>
        <button className=" p-2 rounded-lg bg-red-500 hover:opacity-80" type="button">
          Sign in with Google
        </button>
        <p className="text-[#0B2545]">
          Don't have an account?
          <Link to={"/sign-up"} className="ml-1 text-slate-500">
            Sign up
          </Link>
        </p>
      </form>
      {resMessage && (
        <div className="absolute p-2 bottom-2 right-[40%] left-[40%] text-center rounded-lg bg-[#0B2545] text-[#EEF4ED]">
          {resMessage}!
          <span onClick={() => setResMessage("")} className="cursor-pointer absolute top-[-8px] bg-red-800 w-5 h-5 rounded-full flex justify-center items-center text-[#EEF4ED] right-[-8px] ">
            x
          </span>
        </div>
      )}
    </div>
  );
}

export default SignIn;
