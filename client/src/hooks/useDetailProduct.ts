import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../libs/api";
import { useEffect, useState } from "react";
import useHeader from "./useHeader";
import { product } from "../types";
import { useSelector } from "react-redux";
function useDetailProduct() {
  const [total, setTotal] = useState(1);
  const { id } = useParams();
  const userId = useSelector((state: any) => state.user.user.id);
  const [data, setData] = useState<Array<product>>([]);

  //api product by id
  const {
    data: dataQuery,
    isLoading,
    isError,
    refetch: refetchProductDetail,
  } = useQuery("detailProduct", async () => {
    try {
      const res = await api.get(`/products/${Number(id)}`);
      return res.data.product;
    } catch (error) {
      console.log("Error fetching product details:", error);
    }
  });
  useEffect(() => {
    refetchProductDetail();
  }, [id]);
  useEffect(() => {
    if (dataQuery) {
      setData(dataQuery);
    }
  }, [dataQuery]);

  const productById =
    data &&
    data?.map((item: any) => {
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
    user_id: userId,
    product_id: id,
    quantity: 1,
    size: "",
    total_price: 0,
  });

  const handlePrice = async () => {
    const price = data && data[0]?.product_price;
    console.log({ price });
    setDataCart({ ...dataCart, quantity: total, total_price: price });
  };

  useEffect(() => {
    if (total === 1 || dataQuery) {
      handlePrice();
    } else {
      handlePrice();
    }
  }, [total, dataQuery]);

  //decide if size is available
  const sizes = ["S", "M", "L", "XL"];
  const IsAvailable = sizes.map((item: any) => {
    if (productById[0]?.product_size.map((x: any) => x.size).includes(item)) {
      return true;
    } else {
      return false;
    }
  });

  //refectch cart
  const { refetch } = useHeader();
  //add to cart
  const mutation = useMutation(
    "cart",
    async () => {
      const res = await api.post("/cart", dataCart);
      console.log("yy", res.data);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const addToCart = async () => {
    await handlePrice();
    mutation.mutate();
  };

  return { productById, isLoading, isError, setDataCart, dataCart, total, setTotal, addToCart, IsAvailable, sizes };
}

export default useDetailProduct;
