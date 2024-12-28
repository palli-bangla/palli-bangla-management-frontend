'use client';

import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading/Loading';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust import paths as needed
import { useGetOrdersQuery } from '@/redux/api/orderApi';

const AllOrdersPage = () => {
    const { data, isLoading, isError } = useGetOrdersQuery();

    if (isLoading) return <Loading />;
    if (isError) return <p>Something went wrong!</p>;

    const orders = data?.data || [];

    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <table className="w-full table-auto border-collapse text-left rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium">Customer Name</th>
                                <th className="px-6 py-3 text-sm font-medium">Phone</th>
                                <th className="px-6 py-3 text-sm font-medium">Address</th>
                                <th className="px-6 py-3 text-sm font-medium">Total Amount</th>
                                <th className="px-6 py-3 text-sm font-medium">Status</th>
                                <th className="px-6 py-3 text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900">{order.customer_name}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.customerPhone}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.address}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.totalAmount}</td>
                                    <td className="px-6 py-4 text-gray-900">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                order.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-green-100 text-green-800'
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-3">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleDetails(order._id)}
                                        >
                                            Details
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleEdit(order._id)}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleDelete(order._id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );

    function handleEdit(orderId) {
        console.log('Edit order:', orderId);
    }

    function handleDelete(orderId) {
        console.log('Delete order:', orderId);
    }

    function handleDetails(orderId) {
        console.log('View details for order:', orderId);
    }
};

export default AllOrdersPage;
