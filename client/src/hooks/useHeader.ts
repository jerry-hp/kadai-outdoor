import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import api from "../libs/api";
import { useNavigate } from "react-router-dom";
function useHeader() {
  const user = useSelector((state: any) => state.user.user);

  const [showCart, setShowCart] = useState(false);

  //get data cart
  const userID = useSelector((state: any) => state.user.user.id);
  const { data, refetch } = useQuery("cart", async () => {
    if (!userID) return;
    const res = await api.get("/cart/" + userID);
    return res.data.carts;
  });
  useEffect(() => {
    if (!userID) return;
    refetch();
  }, [userID]);

  //searching products with search input
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleClickSearch = () => {
    if (!keyword) return;
    navigate(`/search/${keyword}`);
  };

  return { user, showCart, setShowCart, userID, data, refetch,  handleChangeSearch, handleClickSearch };
}

export default useHeader;
