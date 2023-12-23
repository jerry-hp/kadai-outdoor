import Sidebar from "./components/sidebar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useHome from "../hooks/useHome";
import { product } from "../types";
import useFormProduct from "./hooks/useFormProduct";

function FormProduct() {
  const navigate = useNavigate();
  const { products } = useHome();
  const {  deleteProduct } = useFormProduct();
  // console.log(products);
  return (
    <div className="flex min-h-[100vh] ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 box-border">
          <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl text-[#0B2545] font-semibold mb-4">Product</h1>
            <div className="mb-1 flex justify-end">
              <button onClick={() => navigate("/create-product")} className="bg-[#0B2545] text-white p-2 rounded">
                Add Product
              </button>
            </div>
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-[#0B2545] xl:pl-11">Name</th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-[#0B2545]">Price</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-[#0B2545]">Category</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-[#0B2545]">Brand</th>
                  <th className="py-4 px-4 font-medium text-[#0B2545]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item: product, index: number) => (
                  <tr key={index} className="text-[#0B2545]">
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 flex">
                      <img src={item.product_image} className="w-12 h-12 rounded-lg" />
                      <p className="text-sm">{item.product_name}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="">{item.product_price}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">{item.product_category}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">{item.product_brand}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary">
                          <FaEdit />
                        </button>
                        <button onClick={() => deleteProduct(item.id)} className="hover:text-primary">
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FormProduct;
