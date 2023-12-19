import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    product_name: yup.string().required(),
    product_brand: yup.string().required(),
    product_category: yup.string().required(),
    product_price: yup.number().positive().integer().required(),
    product_description: yup.string().required(),
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
    },
  });
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit((data) => console.log(data))}>
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
          <input {...register("product_brand")} type="text" id="product_brand" className="mt-1 p-2 border rounded-md w-full" />
          {errors.product_brand && <p className="text-red-500">{errors.product_brand?.message}</p>}
        </div>

        <div>
          <label htmlFor="product_category" className="block text-sm font-medium text-gray-600">
            Product Category
          </label>
          <input {...register("product_category")} type="text" id="product_category" className="mt-1 p-2 border rounded-md w-full" />
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
          <label htmlFor="product_description" className="block text-sm font-medium text-gray-600">
            Product Description
          </label>
          <input {...register("product_description")} type="text" id="product_description" className="mt-1 p-2 border rounded-md w-full" />
          {errors.product_description && <p className="text-red-500">{errors.product_description?.message}</p>}
        </div>
        <div>
          <input type="submit" value="Submit" className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" />
        </div>
      </form>
    </div>
  );
}

export default Admin;
