import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Sidebar from "./sidebar";
import api from "../libs/api";

const schema = yup
  .object({
    product_name: yup.string().required(),
    product_brand: yup.string().required(),
    product_category: yup.string().required(),
    product_price: yup.number().positive().integer().required(),
    product_description: yup.string().required(),
    // product_image: yup.mixed().required("Product Image is required"),
  })
  .required();

function Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      product_name: "",
      product_brand: "",
      product_category: "",
      product_price: 0,
      product_description: "",
      // product_image: {},
    },
  });

  // const handleFileChange = (event: any) => {
  //   // Handle file changes and update the form state
  //   const file = event.target.files[0];
  //   // You might want to perform additional checks on the file, e.g., size, type, etc.
  //   // For simplicity, we'll update the form state directly.
  //   register("product_image").onChange(file);
  // };

  const postProduct = async (data: any) => {
    try {
      const res = await api.post("/product", data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[100vh] ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Add Product</h1>

            <form className="space-y-4" onSubmit={handleSubmit(postProduct)}>
              <div>
                <label htmlFor="product_name" className="block text-sm font-medium text-gray-600">
                  Product Name
                </label>
                <input {...register("product_name")} type="text" id="product_name" className="mt-1 p-2 border rounded-md w-full" />
                {errors.product_name && <p className="text-red-500">{errors.product_name?.message}</p>}
              </div>

              <div>
                <label htmlFor="product_brand" className="block text-sm font-medium text-gray-600">
                  Product Brand
                </label>
                <select {...register("product_brand")} id="product_brand" className="mt-1 p-2 border rounded-md w-full">
                  <option value="">Select Brand</option>
                  <option value="EIGER">EIGER</option>
                  <option value="CONSINA">CONSINA</option>
                  <option value="AREI">AREI</option>
                </select>
                {errors.product_brand && <p className="text-red-500">{errors.product_brand?.message}</p>}
              </div>

              <div>
                <label htmlFor="product_category" className="block text-sm font-medium text-gray-600">
                  Product Category
                </label>
                <select {...register("product_category")} id="product_category" className="mt-1 p-2 border rounded-md w-full">
                  <option value="">Select Category</option>
                  <option value="shirt">Shirt</option>
                  <option value="jacket">Jacket</option>
                  <option value="pant">Pant</option>
                  <option value="shoes">Shoes</option>
                  <option value="slippers">Slippers</option>
                  <option value="tent">Tent</option>
                  <option value="carrier">Carrier</option>
                </select>
                {errors.product_category && <p className="text-red-500">{errors.product_category?.message}</p>}
              </div>

              <div>
                <label htmlFor="product_price" className="block text-sm font-medium text-gray-600">
                  Product Price
                </label>
                <input {...register("product_price")} type="number" id="product_price" className="mt-1 p-2 border rounded-md w-full" />
                {errors.product_price && <p className="text-red-500">{errors.product_price?.message}</p>}
              </div>

              {/* <div>
                <label htmlFor="product_image" className="block text-sm font-medium text-gray-600">
                  Product Image
                </label>
                <input {...register("product_image")} type="file" accept="image/*" onChange={handleFileChange} id="product_image" className="mt-1 p-2 border rounded-md w-full" />
                {errors.product_image && <p className="text-red-500">{errors.product_image?.message}</p>}
              </div> */}

              <div>
                <label htmlFor="product_description" className="block text-sm font-medium text-gray-600">
                  Product Description
                </label>
                <input {...register("product_description")} type="text" id="product_description" className="mt-1 p-2 border rounded-md w-full" />
                {errors.product_description && <p className="text-red-500">{errors.product_description?.message}</p>}
              </div>
              <div>
                <input type="submit" value="Submit" className="bg-[#0B2545] text-white p-2 rounded-md cursor-pointer" />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
