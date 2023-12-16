import { useState } from "react";
import { useQuery } from "react-query";
import api from "../libs/api";
import { product } from "../types";
import { useNavigate } from "react-router-dom";
function useHome() {
  const [isMen, setIsMen] = useState(true);
  //api all products
  const { data, isLoading, isError } = useQuery("products", async () => {
    const res = await api.get("/products");
    return res.data.products;
  });

  // number to currency
  const products = data?.map((item: product) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return {
      ...item,
      product_price: rupiah.format(item.product_price),
    };
  });

 const navigate = useNavigate();
 const goToProductDetail = (params: string) => {
   navigate(`/products/${params}`);
 }

  return {
    products,
    isLoading,
    isError, 
    isMen,
    setIsMen,
    goToProductDetail
  };
}

export default useHome;
