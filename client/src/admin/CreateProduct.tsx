import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Sidebar from "./components/sidebar";
import api from "../libs/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    product_name: yup.string().required(),
    product_brand: yup.string().required(),
    product_category: yup.string().required(),
    product_price: yup.number().positive().integer().required(),
    product_gender: yup.string().required(),
    product_description: yup.string().required(),
    product_image: yup.mixed().required("Product Image is required"),
    product_size: yup.array().of(yup.string()).min(1, "Select at least one size").required(),
  })
  .required();

function Admin() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
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
      product_image: {},
      product_size: [],
      product_gender: "",
    },
  });

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const navigate = useNavigate();

  const postProduct = async (data: any) => {
    try {
      setLoading(true);
      const dataProduct = new FormData();
      dataProduct.append("product_name", data.product_name);
      dataProduct.append("product_brand", data.product_brand);
      dataProduct.append("product_category", data.product_category);
      dataProduct.append("product_price", data.product_price);
      dataProduct.append("product_gender", data.product_gender);
      dataProduct.append("product_description", data.product_description);
      dataProduct.append("product_size", data.product_size);
      dataProduct.append("product_image", image);

      const res = await api.post("/product", dataProduct);
      console.log(res.data);
      setLoading(false);
      navigate("/admin");
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

              <div>
                <label htmlFor="product_gender" className="block text-sm font-medium text-gray-600">
                  Product Gender
                </label>
                <select {...register("product_gender")} id="product_gender" className="mt-1 p-2 border rounded-md w-full">
                  <option value="">Select Gender</option>
                  <option value="men">Men</option>
                  <option value="women">women</option>
                </select>
                {errors.product_gender && <p className="text-red-500">{errors.product_gender?.message}</p>}
              </div>

              <div>
                <label htmlFor="product_image" className="block text-sm font-medium text-gray-600">
                  Product Image
                </label>
                <input {...register("product_image")} type="file" name="product_image" accept="image/*" onChange={handleImageChange} id="product_image" className="mt-1 p-2 border rounded-md w-full" />
                {errors.product_image && <p className="text-red-500">{errors.product_image?.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Product Size</label>
                <div className="flex mt-1 space-x-4">
                  <label className="inline-flex items-center">
                    <input type="checkbox" {...register("product_size")} value="S" />
                    <span className="ml-2">S</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" {...register("product_size")} value="M" />
                    <span className="ml-2">M</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" {...register("product_size")} value="L" />
                    <span className="ml-2">L</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" {...register("product_size")} value="XL" />
                    <span className="ml-2">XL</span>
                  </label>
                </div>
                {errors.product_size && <p className="text-red-500">{errors.product_size?.message}</p>}
              </div>

              <div>
                <label htmlFor="product_description" className="block text-sm font-medium text-gray-600">
                  Product Description
                </label>
                <input {...register("product_description")} type="text" id="product_description" className="mt-1 p-2 border rounded-md w-full" />
                {errors.product_description && <p className="text-red-500">{errors.product_description?.message}</p>}
              </div>
              <div>
                <input type="submit" disabled={loading} value={loading ? "Loading..." : "Create Product"} className="bg-[#0B2545] text-white p-2 disabled:opacity-50 rounded-md cursor-pointer" />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
