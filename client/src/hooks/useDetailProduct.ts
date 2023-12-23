import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../libs/api";
import { useEffect, useState } from "react";
import useHeader from "./useHeader";
function useDetailProduct() {
  const { id } = useParams();
  const [total, setTotal] = useState(1);

  //api product by id
  const { data, isLoading, isError } = useQuery("detailProduct", async () => {
    const res = await api.get("/products/" + id);
    return res.data.product;
  });

  const productById = data?.map((item: any) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return {
      ...item,
      product_price: rupiah.format(item.product_price),
    };
  });

  //state data Cart
  const [dataCart, setDataCart] = useState({
    user_id: 19,
    product_id: id,
    quantity: 1,
    size: "",
    total_price: 0,
  });

  const handlePrice = async () => {
    const price = await data[0]?.product_price;
    setDataCart({ ...dataCart, quantity: total, total_price: total !== 1 ? price * total : price });
  };

  useEffect(() => {
    handlePrice();
  }, [total]);

  //refectch cart
  const { refetch } = useHeader();
  //add to cart
  const mutation = useMutation(
    "cart",
    async () => {
      const res = await api.post("/cart", dataCart);
      console.log(res);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const addToCart = async () => {
    mutation.mutate();
  };

  return { productById, isLoading, isError, setDataCart, dataCart, total, setTotal, addToCart };
}

export default useDetailProduct;
