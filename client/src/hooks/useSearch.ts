import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../libs/api";
import { useEffect } from "react";
function useSearch() {
  const { keyword } = useParams();

  const { data, isLoading, isError, refetch } = useQuery("search", async () => {
    const res = await api.get(`products/search?keyword=${keyword}`);
    return res.data.products;
  });

useEffect(() => {
  refetch();
},[keyword])


  //convert to rupiah
  const dataSearch = data?.map((item: any) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return {
      ...item,
      product_price: rupiah.format(item.product_price),
    };
  });

  return { keyword, dataSearch, isLoading, isError };
}

export default useSearch;
