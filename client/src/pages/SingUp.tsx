import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./../firebase";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

function SignUp() {
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const handleSignUp = async (data: FieldValues) => {
    try {
      const { confirmPassword, ...dataSignUp } = data;
      const res = await api.post("/sign-up", dataSignUp);
      console.log(res);
      navigate("/sign-in");
      reset();
      setResMessage(res.data.message);
    } catch (err: any) {
      setResMessage(err.response.data.message);
      reset();
    }
  };

  const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, Provider);
      console.log("resultttt:", result.user);
      const dataUser = {
        username: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };
      const res = await api.post("/google-sign-in", dataUser);
      dispatch(login(res.data));
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-3 max-w-sm mx-auto mt-20 text-[-[#0B2545] ">
        <h1 className="text-3xl font-bold text-center text-[#0B2545]">Sign up</h1>
        <input {...register("username")} type="text" placeholder="Username" className="p-2 outline-[#EEF4ED] rounded-lg" />
        {errors.username && <p className="text-red-500">{`${errors.username.message}`}</p>}
        <input {...register("email")} type="email" placeholder="Email" className="p-2 outline-[#EEF4ED] rounded-lg" />
        {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
        <input {...register("password")} type="password" placeholder="Password" className="p-2 outline-[#EEF4ED] rounded-lg" />
        {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
        <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="p-2 outline-[#EEF4ED] rounded-lg" />
        {errors.confirmPassword && <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>}
        <button disabled={isSubmitting} className="bg-[#0B2545] p-2 rounded-lg text-[#EEF4ED] disabled:opacity-25 hover:opacity-80">
          {isSubmitting ? "Please wait..." : "Sign up"}
        </button>
        <div className=" flex gap-2 items-center justify-between before:content-[''] before:block before:h-[1px] before:bg-[#0B2545] before:w-full after:content-[''] after:block after:h-[1px] after:bg-[#0B2545] after:w-full">or</div>
        <button onClick={handleGoogle} className=" p-2 rounded-lg bg-red-500 hover:opacity-80  text-[#EEF4ED]" type="button">
          Sign in with Google
        </button>
        <p className="text-[#0B2545]">
          have an account?
          <Link to={"/sign-in"} className="ml-1 text-blue-900">
            Sign in
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

export default SignUp;
