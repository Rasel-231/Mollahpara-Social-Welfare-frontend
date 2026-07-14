import { baseApi } from "../store/baseApi";
import { IBloodRequests, ICreateBloodRequest, IResponse, tagtypes } from "../types/types";


const BLOOD_REQUEST_URL = "blood-requests";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.bloodRequest] })
    .injectEndpoints({
        endpoints: (build) => ({
            createBloodRequest: build.mutation<IResponse<IBloodRequests>, ICreateBloodRequest>({
                query: (data) => ({
                    url: `${BLOOD_REQUEST_URL}/create`,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.bloodRequest],
            }),
            getAllBloodRequests: build.query<IResponse<IBloodRequests[]>, string>({
                query: (search) => ({
                    url: BLOOD_REQUEST_URL,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.bloodRequest],
            }),
            getBloodRequestById: build.query<IResponse<IBloodRequests>, string>({
                query: (id) => ({
                    url: `${BLOOD_REQUEST_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.bloodRequest],
            }),
            updateBloodRequest: build.mutation<IResponse<IBloodRequests>, { id: string; data: Partial<IBloodRequests> }>({
                query: ({ id, data }) => ({
                    url: `${BLOOD_REQUEST_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.bloodRequest],
            }),
            deleteBloodRequest: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${BLOOD_REQUEST_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.bloodRequest],
            }),
        }),
    });

export const {
    useCreateBloodRequestMutation,
    useGetAllBloodRequestsQuery,
    useGetBloodRequestByIdQuery,
    useUpdateBloodRequestMutation,
    useDeleteBloodRequestMutation,
} = apiService;
