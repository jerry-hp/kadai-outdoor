import { useState } from "react";
import { useQuery } from "react-query";
import api from "../libs/api";
import { product } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function useHome() {
  const [isMen, setIsMen] = useState(true);
  //api all products
  const { data, isLoading, isError, refetch } = useQuery("products", async () => {
    const res = await api.get("/products");
    const data = res.data.products.filter((item: product) => {
      if (isMen) {
        return item.product_gender === "men";
      } else {
        return item.product_gender === "women";
      }
    });
    return data;
  });

  useEffect(() => {
    refetch();
  }, [isMen]);

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

  //go to detail page
  const navigate = useNavigate();
  const goToProductFilter = (params: string) => {
    navigate(`/products/${params}`);
  };
  const goToProductDetail = (params: string) => {
    navigate(`/detail-product/${params}`);
  };

  return {
    products,
    isLoading,
    isError,
    isMen,
    setIsMen,
    goToProductFilter,
    goToProductDetail
  };
}

export default useHome;
