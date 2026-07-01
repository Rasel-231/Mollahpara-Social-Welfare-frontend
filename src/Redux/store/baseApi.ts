import { createApi, } from "@reduxjs/toolkit/query/react";
import { tagtypeList } from "../types/types";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: tagtypeList,
  endpoints: () => ({}),
});
