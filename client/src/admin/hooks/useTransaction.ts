import { useQuery } from "react-query";
import api from "../../libs/api";

function useTransaction() {
  // get data transaction
  const { data } = useQuery("transaction", async () => {
    const res = await api.get("/transactions");
    return res.data.transactions;
  });

  const transaction = data?.map((item: any) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return {
      ...item,
      amount: rupiah.format(item.amount),
    };
  });

  return { transaction };
}

export default useTransaction;
