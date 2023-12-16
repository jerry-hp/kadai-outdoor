import { useQuery } from "react-query";
import api from "../libs/api";
import { product } from "../types";
import { useParams } from "react-router-dom";
function useFilterProducts() {
  const { category } = useParams();
  //api filter by category
  const {
    data: productByParams,
    isLoading,
    isError,
  } = useQuery("productByParams", async () => {
    const res = await api.get(`product/${category}`);
    return res.data.products;
  });
  // number to currency filter by category
  const filteredProducts = productByParams?.map((item: product) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return {
      ...item,
      product_price: rupiah.format(item.product_price),
    };
  });
  return { filteredProducts, isLoading, isError, category };
}

export default useFilterProducts;
