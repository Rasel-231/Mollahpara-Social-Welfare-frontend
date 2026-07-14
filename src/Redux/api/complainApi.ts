import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IComplain {
    id: string;
    name: string;
    phone: string;
    village: string;
    subject: string;
    message: string;
    userId?: string | null;
    user?: { id: string; name: string; email: string } | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateComplain {
    name: string;
    phone: string;
    email?: string;
    village: string;
    subject: string;
    message: string;
    userId?: string;
}

const COMPLAIN_URL = "complains";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.complain] })
    .injectEndpoints({
        endpoints: (build) => ({
            createComplain: build.mutation<IResponse<IComplain>, ICreateComplain>({
                query: (data) => ({
                    url: `${COMPLAIN_URL}/create`,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.complain],
            }),
            getAllComplains: build.query<IResponse<IComplain[]>, string>({
                query: (search) => ({
                    url: COMPLAIN_URL,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.complain],
            }),
            getSingleComplain: build.query<IResponse<IComplain>, string>({
                query: (id) => ({
                    url: `${COMPLAIN_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.complain],
            }),
            updateComplain: build.mutation<IResponse<IComplain>, { id: string; data: Partial<IComplain> }>({
                query: ({ id, data }) => ({
                    url: `${COMPLAIN_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.complain],
            }),
            deleteComplain: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${COMPLAIN_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.complain],
            }),
        }),
    });

export const {
    useCreateComplainMutation,
    useGetAllComplainsQuery,
    useGetSingleComplainQuery,
    useUpdateComplainMutation,
    useDeleteComplainMutation,
} = apiService;
