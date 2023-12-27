import { useQuery } from "react-query";
import api from "../libs/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function useCart() {
  const [transactionToken, setTransactionToken] = useState("");
  //get data cart
  const token = localStorage.getItem("token");
  const id = useSelector((state) => state.user.user.id);
  const [userID, setUserID] = useState(id);
  const { data, isLoading, isError, refetch } = useQuery("cart", async () => {
    const res = await api.get(`/cart/${userID}`);
    return res.data.carts;
  });

  useEffect(() => {
    if (token) {
      setUserID(id);
    }
  }, [token]);

  //conver to rupiah
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const dataCart = data?.map((item) => {
    return {
      ...item,
      total_price: rupiah.format(item.total_price),
    };
  });

  //total price
  const total = data?.reduce((acc, item) => {
    return acc + item.total_price;
  }, 0);
  const totalPriceCart = rupiah.format(total);

  //delete cart
  const deleteCart = async (id) => {
    const res = await api.delete(`/cart/${id}`);
    console.log(res.data);
    refetch();
  };

  //create transaction
  const createTransaction = async () => {
    const res = await api.post("/transaction", {
      user_id: userID,
    });
    console.log(res.data);
    setTransactionToken(res.data.transactionToken);
  };

  useEffect(() => {
    if (transactionToken) {
      window.snap.pay(transactionToken, {
        onSuccess: function (result) {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          api.put(`/transaction/${result.order_id}`, {
            status: result.transaction_status,
          });
          setTransactionToken("");
        },
        onPending: function (result) {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          api.put(`/transaction/${result.order_id}`, {
            status: result.transaction_status,
          });

          setTransactionToken("");
        },
        onError: function (result) {
          console.log(result);
          api.put(`/transaction/${result.order_id}`, {
            status: result.transaction_status,
          });
          setTransactionToken("");
        },
        onClose: function () {
          console.log("customer closed the popup without finishing the payment");
          api.put(`/transaction/${result.order_id}`, {
            status: result.transaction_status,
          });
          setTransactionToken("");
        },
      });
    }
  }, [transactionToken]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    scriptTag.setAttribute("data-client-key", "SB-Mid-client-icm1hg-Lu-ylMTVb");
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  return { dataCart, isLoading, isError, userID, deleteCart, totalPriceCart, createTransaction };
}

export default useCart;
