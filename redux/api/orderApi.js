import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all orders
    getOrders: build.query({
      query: () => "/order",
    }),

    // Fetch a specific order by ID
    getOrderById: build.query({
      query: (id) => `/order/${id}`,
    }),

    // Add a new order
    addOrder: build.mutation({
      query: (newOrder) => ({
        url: "/order/create",
        method: "POST",
        body: newOrder,
      }),
    }),

    // Update order status
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    // Delete an order
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
