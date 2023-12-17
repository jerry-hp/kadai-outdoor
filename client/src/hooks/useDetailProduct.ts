import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../libs/api";
import { product } from "../types";
function useDetailProduct() {
  const { id } = useParams();

  //api product by id
  const {
    data: productById,
    isLoading,
    isError,
  } = useQuery("detailProduct", async () => {
    const res = await api.get("/products/" + id);
    const data = res.data.product.map((item: product) => {
      const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return {
        ...item,
        product_price: rupiah.format(item.product_price),
      };
    });
    return data;
  });

  return { productById, isLoading, isError };
}

export default useDetailProduct;
