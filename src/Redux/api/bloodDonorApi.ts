import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IDonor {
    id: string;
    name: string;
    phone: string;
    bloodGroup: string;
    lastDonationDate?: string | null;
    address: string;
    isAvailable: boolean;
    userId?: string | null;
    createdAt: Date;
    user?: { id: string; name: string; email: string };
}

export interface ICreateDonor {
    name: string;
    phone: string;
    bloodGroup: string;
    lastDonationDate?: string;
    address: string;
    isAvailable?: boolean;
    userId?: string;
}



const DONOR_URL = "donors";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.donor] })
    .injectEndpoints({
        endpoints: (build) => ({
            createDonor: build.mutation<IResponse<IDonor>, ICreateDonor>({
                query: (data) => ({
                    url: `${DONOR_URL}/create`,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.donor],
            }),
            getAllDonors: build.query<IResponse<IDonor[]>, void>({
                query: () => ({
                    url: DONOR_URL,
                    method: "GET",
                }),
                providesTags: [tagtypes.donor],
            }),
            getDonorById: build.query<IResponse<IDonor>, string>({
                query: (id) => ({
                    url: `${DONOR_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.donor],
            }),
            updateDonor: build.mutation<IResponse<IDonor>, { id: string; data: Partial<IDonor> }>({
                query: ({ id, data }) => ({
                    url: `${DONOR_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.donor],
            }),
            deleteDonor: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${DONOR_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.donor],
            }),
        }),
    });

export const {
    useCreateDonorMutation,
    useGetAllDonorsQuery,
    useGetDonorByIdQuery,
    useUpdateDonorMutation,
    useDeleteDonorMutation,
} = apiService;
