import { useState } from "react";
import api from "../libs/api";
import { ChangeEvent, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice";

export default function useProfile() {
  const email = useSelector((state: any) => state.user.user.email);
  const [isNumber, setIsNumber] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const cancel = () => {
    setIsName(false);
    setIsNumber(false);
    setIsAddress(false);
    setIsEmail(false);
  };

  const [updatedDataUser, setUpdatedDataUser] = useState({
    username: "",
    email,
    newEmail: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedDataUser({
      ...updatedDataUser,
      [e.target.id]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const handleUpdateProfile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.post("/change-user-data", updatedDataUser);
    console.log("behasil", res.data);
    dispatch(login(res.data));
    cancel();
  };

  return { isNumber, setIsNumber, isAddress, setIsAddress, cancel, updatedDataUser, setUpdatedDataUser, handleChange, handleUpdateProfile, isName, setIsName, isEmail, setIsEmail };
}
