import { createApi, } from "@reduxjs/toolkit/query/react";
import { tagtypeList } from "../types/types";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: (process.env.NEXT_PUBLIC_API_URL || "https://mollahpara-social-welfare-backend.onrender.com/api/v1/").replace(/\/?$/, "/") }),
  tagTypes: tagtypeList,
  endpoints: () => ({}),
});
