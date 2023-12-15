import { useState } from "react";
import api from "../libs/api";
import { ChangeEvent, MouseEvent } from "react";
import { useSelector } from "react-redux";

export default function useProfile() {
  const email = useSelector((state: any) => state.user.user.email);
  const [changeRole, setChangeRole] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const cancel = () => {
    setChangeRole(false);
    setIsNumber(false);
    setIsAddress(false);
  };

  const [updatedDataUser, setUpdatedDataUser] = useState({
    email,
    phone: "",
    address: "",
    role: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedDataUser({
      ...updatedDataUser,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.post("/change-user-data", updatedDataUser);
    console.log("behasil", res.data);
    // console.log({ role });
  };

  return { changeRole, setChangeRole, isNumber, setIsNumber, isAddress, setIsAddress, cancel, updatedDataUser,setUpdatedDataUser, handleChange, handleUpdateProfile };
}
