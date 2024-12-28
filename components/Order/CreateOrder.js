// "use client";

// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { getUserInfo } from "@/services/auth.service";
// import Loading from "@/components/Loading/Loading";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
// import { useGetProductsQuery } from "@/redux/api/productApi";


// const CreateOrder = () => {

//   const [productSizes, setProductSizes] = useState([]);
//   const [loading, setLoading] = useState(false);


//   const { control, register, handleSubmit, watch, setValue } = useForm({
//     defaultValues: {
//       customer_name: "",
//       customerPhone: "",
//       district: "",
//       thana: "",
//       address: "",
//       delivery_charge: 0,
//       products: [{ productId: "", size: "", quantity: 1, priceAtPurchase: 0, weight: 0 }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "products",
//   });

//   const { data, error, isLoading } = useGetProductsQuery();

//   if (isLoading) return <Loading />;
//   if (error) return <p>Error occurred while fetching products.</p>;

//   const products = data?.data || [];
//   const watchProducts = watch("products");


//   const calculateTotal = () => {
//     return (
//       watchProducts.reduce((total, product) => {
//         return total + product.quantity * (product.priceAtPurchase || 0);
//       }, 0) + parseFloat(watch("delivery_charge") || 0)
//     );
//   };


//   const calculateTotalWeight = () => {
//     return watchProducts.reduce((total, product) => {
//       const sizeValue = product.size.toLowerCase().trim();
//       const quantity = product.quantity || 0;

//       let weightInKg = 0;

//       // Handle kg and kgs (kg is for weight in kilograms)
//       if (sizeValue.includes("kg")) {
//         weightInKg = parseFloat(sizeValue.replace(/kg(s)?/, "")) || 0;
//       }
//       // Handle gram and grams (grams need to be converted to kg)
//       else if (sizeValue.includes("gram")) {
//         const grams = parseFloat(sizeValue.replace(/gram(s)?/, "")) || 0;
//         weightInKg = grams / 1000; // Convert grams to kilograms
//       }
//       else if (sizeValue.includes("ml")) {
//         const ml = parseFloat(sizeValue.replace("ml", "")) || 0;
//         weightInKg = ml / 1000; 
//       }
//       else if (sizeValue.includes("litter") || sizeValue.includes("liter")) {
//         weightInKg = parseFloat(sizeValue.replace(/litter(s)?|liter(s)?/, "")) || 0;
//       }
//       return total + weightInKg * quantity;
//     }, 0);
//   };


//   const handleProductChange = (value, index) => {
//     const selectedProduct = products.find((p) => p._id === value);
//     setValue(`products.${index}.productId`, value);

//     const availableSizes = selectedProduct ? selectedProduct.product_details : [];
//     setProductSizes(availableSizes);
//     setValue(`products.${index}.size`, "");
//     setValue(`products.${index}.priceAtPurchase`, 0);
//     setValue(`products.${index}.weight`, 0);
//   };


//   const handleSizeChange = (value, index) => {
//     const selectedSize = productSizes.find((size) => size.size === value);
//     setValue(`products.${index}.size`, value);
//     setValue(`products.${index}.priceAtPurchase`, selectedSize ? selectedSize.price : 0);
//     setValue(`products.${index}.weight`, selectedSize ? selectedSize.weight : 0);
//   };


//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       data.delivery_charge = parseFloat(data.delivery_charge) || 0;
//       data.products = data.products.map((product) => {
//         const { weight, ...productWithoutWeight } = product;
//         return productWithoutWeight;
//       });

//       // Calculate total amounts and weights
//       data.totalAmount = calculateTotal();
//       data.totalWeight = calculateTotalWeight();

//       console.log("Submitting Order:", data);
//     //   const res = await createOrder({ ...data }).unwrap();
//       const res = "";
//       console.log(res, 'response');

//       alert("Order created successfully!");
//     } catch (error) {
//       console.error("Error creating order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="p-6 bg-white shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Create Order</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <Label htmlFor="customer_name">Customer Name</Label>
//             <Input {...register("customer_name", { required: true })} placeholder="Enter customer name" />
//           </div>
//           <div>
//             <Label htmlFor="customerPhone">Customer Phone</Label>
//             <Input {...register("customerPhone", { required: true })} placeholder="Enter customer phone" />
//           </div>
//           <div>
//             <Label htmlFor="district">District</Label>
//             <Input {...register("district", { required: true })} placeholder="Enter district" />
//           </div>
//           <div>
//             <Label htmlFor="thana">Thana</Label>
//             <Input {...register("thana", { required: true })} placeholder="Enter thana" />
//           </div>
//           <div>
//             <Label htmlFor="address">Address</Label>
//             <Input {...register("address", { required: true })} placeholder="Enter address" />
//           </div>

//           <div>
//             <Label htmlFor="delivery_charge">Delivery Charge</Label>
//             <Input
//               type="number"
//               {...register("delivery_charge", {
//                 required: "Delivery charge is required",
//                 min: {
//                   value: 0,
//                   message: "Delivery charge must be at least 0",
//                 },
//               })}
//               placeholder="Enter delivery charge"
//             />
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-2">Products</h2>
//           {fields.map((field, index) => (
//             <div key={field.id} className="grid grid-cols-7 gap-4 mb-2 items-center">
//               <div>
//                 <Label>Product</Label>
//                 <Select
//                   onValueChange={(value) => handleProductChange(value, index)}
//                   value={watch(`products.${index}.productId`)}
//                 >
//                   <SelectTrigger>
//                     <span>
//                       {watch(`products.${index}.productId`)
//                         ? products.find((p) => p._id === watch(`products.${index}.productId`))?.product_name
//                         : "Select product"}
//                     </span>
//                   </SelectTrigger>
//                   <SelectContent>
//                     {products.map((product) => (
//                       <SelectItem key={product._id} value={product._id}>
//                         {product.product_name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label>Size</Label>
//                 <Select
//                   onValueChange={(value) => handleSizeChange(value, index)}
//                   value={watch(`products.${index}.size`)}
//                   disabled={!productSizes.length}
//                 >
//                   <SelectTrigger>
//                     <span>{watch(`products.${index}.size`) || "Select size"}</span>
//                   </SelectTrigger>
//                   <SelectContent>
//                     {productSizes.map((size) => (
//                       <SelectItem key={size.size} value={size.size}>
//                         {size.size}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label>Price</Label>
//                 <Input readOnly value={watch(`products.${index}.priceAtPurchase`)} />
//               </div>
//               <div>
//                 <Label>Quantity</Label>
//                 <Input type="number" {...register(`products.${index}.quantity`, { required: true })} />
//               </div>
//               <Button className="mt-6" type="button" variant="destructive" onClick={() => remove(index)}>
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <Button type="button" onClick={() => append({ productId: "", size: "", quantity: 1, priceAtPurchase: 0, weight: 0 })}>
//             Add Product
//           </Button>
//         </div>
//         <div className="mt-6 p-4 border rounded-md bg-gray-100">
//           <h3 className="text-lg font-semibold mb-4">Summary</h3>
//           <div className="grid grid-cols-3 gap-4 text-center">
//             <div className="text-md font-bold">
//               <p>Total Weight</p>
//               <p>{calculateTotalWeight().toFixed(2)} kg</p>
//             </div>
//             <div className="text-md font-bold">
//               <p>Total Delivery Charge</p>
//               <p>{watch("delivery_charge") || 0} </p>
//             </div>
//             <div className="text-md font-bold">
//               <p>Total Amount</p>
//               <p>{calculateTotal().toFixed(2)}</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end items-center mt-4">
//           <Button type="submit" disabled={loading} className="mt-2">
//             {loading ? "Creating Order..." : "Create Order"}
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

// export default CreateOrder;


"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth.service";
import Loading from "@/components/Loading/Loading";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { useAddOrderMutation } from "@/redux/api/orderApi";

const CreateOrder = () => {

  const [productSizes, setProductSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useGetProductsQuery();
  const [addOrder]= useAddOrderMutation();
  
  const { control, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      customer_name: "",
      customerPhone: "",
      district: "",
      thana: "",
      address: "",
      delivery_charge: 0,
      products: [{ productId: "", size: "", quantity: 1, priceAtPurchase: 0, weight: 0 }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  
  const products = data?.data || [];
  const user = getUserInfo();
  
  const { data:userInfo} = useGetUserByIdQuery(user?._id);
  
  const name = userInfo?.data?.name; 
  const number = userInfo?.data?.phone_number
  const role = userInfo?.data?.role;


  if (isLoading) return <Loading />;
  if (error) return <p>Error occurred while fetching products.</p>;

  
  const watchProducts = watch("products");

  const calculateTotal = () => {
    return (
      watchProducts.reduce((total, product) => {
        return total + product.quantity * (product.priceAtPurchase || 0);
      }, 0) + parseFloat(watch("delivery_charge") || 0)
    );
  };

  const calculateTotalWeight = () => {
    return watchProducts.reduce((total, product) => {
      const sizeValue = product.size.toLowerCase().trim();
      const quantity = product.quantity || 0;

      let weightInKg = 0;

      if (sizeValue.includes("kg")) {
        weightInKg = parseFloat(sizeValue.replace(/kg(s)?/, "")) || 0;
      } else if (sizeValue.includes("gram")) {
        const grams = parseFloat(sizeValue.replace(/gram(s)?/, "")) || 0;
        weightInKg = grams / 1000;
      } else if (sizeValue.includes("ml")) {
        const ml = parseFloat(sizeValue.replace("ml", "")) || 0;
        weightInKg = ml / 1000;
      } else if (sizeValue.includes("litter") || sizeValue.includes("liter")) {
        weightInKg = parseFloat(sizeValue.replace(/litter(s)?|liter(s)?/, "")) || 0;
      }
      return total + weightInKg * quantity;
    }, 0);
  };
 
  const handleProductChange = (value, index) => {
    const selectedProduct = products.find((p) => p._id === value);
    setValue(`products.${index}.productId`, value);

    const availableSizes = selectedProduct ? selectedProduct.product_details : [];
    setProductSizes(availableSizes);
    setValue(`products.${index}.size`, "");
    setValue(`products.${index}.priceAtPurchase`, 0);
    setValue(`products.${index}.weight`, 0);
  };

  const handleSizeChange = (value, index) => {
    const selectedSize = productSizes.find((size) => size.size === value);
    setValue(`products.${index}.size`, value);
    setValue(`products.${index}.priceAtPurchase`, selectedSize ? selectedSize.price : 0);
    setValue(`products.${index}.weight`, selectedSize ? selectedSize.weight : 0);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      data.delivery_charge = parseFloat(data.delivery_charge) || 0;
      data.products = data.products.map((product) => {
        const { weight, ...productWithoutWeight } = product;
        return productWithoutWeight;
      });

      data.totalAmount = calculateTotal();
      data.totalWeight = calculateTotalWeight();

      data.order_entry_user=name;
      data.order_entry_user_number= number;
      data.order_entry_role= role;

      console.log("Submitting Order:", data);
      const res = await addOrder({ ...data }).unwrap();
      // const res = "";
      console.log(res, 'response');

      toast.success("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Customer Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="customer_name">Customer Name</Label>
            <Input {...register("customer_name", { required: true })} placeholder="Enter customer name" />
          </div>
          <div>
            <Label htmlFor="customerPhone">Customer Phone</Label>
            <Input {...register("customerPhone", { required: true })} placeholder="Enter customer phone" />
          </div>
          <div>
            <Label htmlFor="district">District</Label>
            <Input {...register("district", { required: true })} placeholder="Enter district" />
          </div>
          <div>
            <Label htmlFor="thana">Thana</Label>
            <Input {...register("thana", { required: true })} placeholder="Enter thana" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input {...register("address", { required: true })} placeholder="Enter address" />
          </div>
          <div>
            <Label htmlFor="delivery_charge">Delivery Charge</Label>
            <Input
              type="number"
              {...register("delivery_charge", {
                required: "Delivery charge is required",
                min: {
                  value: 0,
                  message: "Delivery charge must be at least 0",
                },
              })}
              placeholder="Enter delivery charge"
            />
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-2 items-center">
              <div>
                <Label>Product</Label>
                <Select
                  onValueChange={(value) => handleProductChange(value, index)}
                  value={watch(`products.${index}.productId`)}
                >
                  <SelectTrigger>
                    <span>
                      {watch(`products.${index}.productId`)
                        ? products.find((p) => p._id === watch(`products.${index}.productId`))?.product_name
                        : "Select product"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.product_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Size</Label>
                <Select
                  onValueChange={(value) => handleSizeChange(value, index)}
                  value={watch(`products.${index}.size`)}
                  disabled={!productSizes.length}
                >
                  <SelectTrigger>
                    <span>{watch(`products.${index}.size`) || "Select size"}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {productSizes.map((size) => (
                      <SelectItem key={size.size} value={size.size}>
                        {size.size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price</Label>
                <Input readOnly value={watch(`products.${index}.priceAtPurchase`)} />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input type="number" {...register(`products.${index}.quantity`, { required: true })} />
              </div>
              <Button className="mt-6" type="button" variant="destructive" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append({ productId: "", size: "", quantity: 1, priceAtPurchase: 0, weight: 0 })}>
            Add Product
          </Button>
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>
          <div className="grid grid-cols-3 text-center">
            <div className="text-md font-bold">
              <p>Total Weight</p>
              <p>{calculateTotalWeight().toFixed(2)} kg</p>
            </div>
            <div className="text-md font-bold">
              <p>Total Delivery Charge</p>
              <p>{watch("delivery_charge") || 0} </p>
            </div>
            <div className="text-md font-bold">
              <p>Total Amount</p>
              <p>{calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center mt-4">
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Creating Order..." : "Create Order"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateOrder;
