import { baseApi } from "./baseApi";


const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/product',
    }),
    addProduct: build.mutation({
      query: (newProduct) => ({
        url: '/product/create',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/product/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetProductsQuery, 
  useAddProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} = productApi;
