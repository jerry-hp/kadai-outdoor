import { useQuery } from "react-query";
import api from "../libs/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDetailProduct from "./useDetailProduct";
function useWishList() {
  const userId = useSelector((state: any) => state.user.user.id);

  //get data wishList
  const { isLoading, data } = useQuery("wishList", async () => {
    const res = await api.get("/wish-list/" + userId);
    return res.data.wishList;
  });

  //convert to rupiah
  const wistList = data?.map((item: any) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    const products = item.products.map((product: any) => {
      return {
        ...product,
        product_price: rupiah.format(product.product_price),
      };
    });

    return { ...item, products };
  });

  //navigate to detail product
  const navigate = useNavigate();
  const handleNavigate = async (id: number) => {
   
    navigate(`/detail-product/${id}`);
  };

  return { isLoading, wistList, handleNavigate };
}
export default useWishList;
