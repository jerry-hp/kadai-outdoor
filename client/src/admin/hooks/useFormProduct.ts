import useHome from "../../hooks/useHome";
import api from "../../libs/api";
function useFormProduct() {
  const { refetch } = useHome();
  const deleteProduct = async (idP: number) => {
    const res = await api.delete(`/product/${idP}`);
    console.log(res.data);
    refetch();
  };
  return {
    deleteProduct,
  };
}

export default useFormProduct;
