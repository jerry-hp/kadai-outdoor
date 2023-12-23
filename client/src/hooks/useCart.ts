import { useQuery } from "react-query";
import api from "../libs/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function useCart() {
  //get data cart
  const token = localStorage.getItem("token");
  const id: number = useSelector((state: any) => state.user.user.id);
  const [userID, setUserID] = useState(id);
  const { data, isLoading, isError } = useQuery("cart", async () => {
    const res = await api.get(`/cart/${userID}`);
    return res.data.carts;
  });

  useEffect(() => {
    if (token) {
      setUserID(id);
    }
  }, [token]);

  //conver to rupiah
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const dataCart = data?.map((item: any) => {
    return {
      ...item,
      total_price: rupiah.format(item.total_price),
    };
  });

  return { dataCart, isLoading, isError, userID };
}

export default useCart;
