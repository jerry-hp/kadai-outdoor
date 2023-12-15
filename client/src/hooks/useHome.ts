import { useQuery } from "react-query";
import api from "../libs/api";
function useHome() {
  const {
    data: dataProducts,
    isLoading,
    isError,
  } = useQuery("products", async () => {
    const res = await api.get("/products");
    return res.data.products;
  });

  const products =
    dataProducts &&
    dataProducts.map((item: any) => {
      const currency = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return {
        ...item,
        product_price: currency.format(item.product_price),
      };
    });

  return {
    products,
    isLoading,
    isError,
  };
}

export default useHome;
