'use client';

import Loading from '@/components/Loading/Loading';
import { useGetProductsQuery } from '@/redux/api/productApi';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust import paths as necessary

const ProductTable = () => {
    const { data, isLoading, error } = useGetProductsQuery();

    if (isLoading) return <Loading />;
    if (error) return <p>Error occurred while fetching products.</p>;

    const products = data?.data || [];

    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Product Table</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-medium text-left">Product Name</th>
                                    <th className="px-6 py-3 text-sm font-medium text-left">Size</th>
                                    <th className="px-6 py-3 text-sm font-medium text-left">Stock</th>
                                    <th className="px-6 py-3 text-sm font-medium text-left">Available</th>
                                    <th className="px-6 py-3 text-sm font-medium text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) =>
                                    product.product_details.map((detail, index) => (
                                        <tr key={`${product._id}-${index}`} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 text-gray-900">{product.product_name}</td>
                                            <td className="px-6 py-4 text-gray-900">{detail.size}</td>
                                            <td className="px-6 py-4 text-gray-900">{detail.stock}</td>
                                            <td
                                                className={`px-6 py-4 font-semibold ${
                                                    detail.is_available ? 'text-green-600' : 'text-red-600'
                                                }`}
                                            >
                                                {detail.is_available ? 'Available' : 'Unavailable'}
                                            </td>
                                            <td className="px-6 py-4 flex space-x-3">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleDetails(product._id, detail.size)}
                                                >
                                                    Details
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleEdit(product._id, detail.size)}
                                                    className="text-blue-600"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleDelete(product._id, detail.size)}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    function handleDetails(productId, size) {
        console.log('View details for product:', productId, 'Size:', size);
    }

    function handleEdit(productId, size) {
        console.log('Edit product:', productId, 'Size:', size);
    }

    function handleDelete(productId, size) {
        console.log('Delete product:', productId, 'Size:', size);
    }
};

export default ProductTable;

