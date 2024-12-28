'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "@/redux/api/productApi";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddProductForm = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      size: "",
      price: "",
      category: "",
      stock: "",
      is_available: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await addProduct(data).unwrap();
      console.log("Product added successfully:", response);
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen -mt-10 bg-gray-50 px-4">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Add New Product</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Product Name */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Product name is required." })}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Size */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                {...register("size", { required: "Size is required." })}
                placeholder="Enter product size (e.g., 250 ml)"
              />
              {errors.size && <p className="text-sm text-red-500">{errors.size.message}</p>}
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                {...register("price", {
                  required: "Price is required.",
                  valueAsNumber: true,
                  validate: (value) => value > 0 || "Price must be greater than zero.",
                })}
                type="number"
                placeholder="Enter price"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category", { required: "Category is required." })}
                placeholder="Enter category"
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            {/* Stock */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                {...register("stock", {
                  required: "Stock is required.",
                  valueAsNumber: true,
                  validate: (value) => value >= 0 || "Stock must be zero or more.",
                })}
                type="number"
                placeholder="Enter stock quantity"
              />
              {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Adding..." : "Add Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddProductForm;
