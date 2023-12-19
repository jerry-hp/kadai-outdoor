import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../libs/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function useDetailProduct() {
  const userID = useSelector((state: any) => state.user.user.id);
  const { id } = useParams();
  const [total, setTotal] = useState(1);

  //api product by id
  const { data, isLoading, isError } = useQuery("detailProduct", async () => {
    const res = await api.get("/products/" + id);
    // const data = res.data.product.map((item: product) => {
    //   const rupiah = new Intl.NumberFormat("id-ID", {
    //     style: "currency",
    //     currency: "IDR",
    //   });
    //   return {
    //     ...item,
    //     product_price: rupiah.format(item.product_price),
    //   };
    // });
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
    user_id: userID,
    product_id: id,
    quantity: 1,
    size: "",
    total_price: 0,
  });

  const handlePrice = async () => {
    const price = await data[0]?.product_price;
    setDataCart({ ...dataCart, quantity: total, total_price: price * total });
  };

  useEffect(() => {
    handlePrice();
  }, [total]);
   
  //add to cart
  const addToCart = async () => {
    const res = await api.post("/cart", dataCart);
    console.log(res);
  }


  return { productById, isLoading, isError, setDataCart, dataCart, total, setTotal, addToCart };
}

export default useDetailProduct;
