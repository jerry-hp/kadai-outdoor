import { useQuery } from "react-query";
import api from "../libs/api";
import { useSelector } from "react-redux";

function useCart() {
  //get data cart
  const userID = useSelector((state: any) => state.user.user.id);
  const { data, isLoading, isError } = useQuery("cart", async () => {
    const res = await api.get("/cart/" + userID);
    return res.data.carts;
  });

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

  return { dataCart, isLoading, isError };
}

export default useCart;
