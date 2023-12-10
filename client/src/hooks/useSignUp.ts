import { useState } from "react";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";

function useSignUp() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await api.post("/sign-up", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setIsLoading(false);
      console.log(res.data);
      navigate("/sign-in");
    } catch (err: any) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return {
    isError,
    isLoading,
    data,
    handleChange,
    handleClick,
  };
}

export default useSignUp;
