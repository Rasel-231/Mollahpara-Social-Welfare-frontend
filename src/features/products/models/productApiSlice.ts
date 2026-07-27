import { baseApi } from "@/Redux/store/baseApi";

const productApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "products", method: "GET" }),
    }),
    getProduct: builder.query({
      query: (id: string) => ({ url: `products/${id}`, method: "GET" }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productApiSlice;
