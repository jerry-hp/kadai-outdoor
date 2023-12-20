import {  useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";


import api from "../libs/api";
function useHeader() {
    const user = useSelector((state: any) => state.user.user);
  const [showCart, setShowCart] = useState(false);

  //get data cart
  const userID = useSelector((state: any) => state.user.user.id);
  const { data,refetch } = useQuery("cart", async () => {
    const res = await api.get("/cart/" + userID);
    return res.data.carts;
  });
  return {user,showCart,setShowCart,userID,data,refetch}
}

export default useHeader