import { baseApi } from "../store/baseApi";
import { IFund, IResponse, tagtypes } from "../types/types";

export interface ICreateDonation {
    donorName: string;
    phone: string;
    email?: string;
    amount: number;
    paymentMethod: string;
    transactionId: string;
    purpose: string;
    message?: string;
}

const FUND_URL = "funds";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.fund] })
    .injectEndpoints({
        endpoints: (build) => ({
            createDonation: build.mutation<IResponse<IFund>, ICreateDonation>({
                query: (fundData) => ({
                    url: `${FUND_URL}/donations`,
                    method: "POST",
                    data: fundData
                }),
                invalidatesTags: [tagtypes.fund],
            }),
            getAllFunds: build.query<IResponse<IFund[]>, string>({
                query: (search) => ({
                    url: `${FUND_URL}`,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.fund],
            }),
            getFundById: build.query<IResponse<IFund>, string>({
                query: (id) => ({
                    url: `${FUND_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.fund],
            }),
            updateFund: build.mutation<IResponse<IFund>, { id: string; data: Partial<IFund> }>({
                query: ({ id, data }) => ({
                    url: `${FUND_URL}/${id}`,
                    method: "PATCH",
                    data: data
                }),
                invalidatesTags: [tagtypes.fund],
            }),
            deleteFund: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${FUND_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.fund],
            }),
            updateFundStatus: build.mutation<IResponse<IFund>, { id: string; status: string }>({
                query: ({ id, status }) => ({
                    url: `${FUND_URL}/${id}/status`,
                    method: "PATCH",
                    data: { status }
                }),
                invalidatesTags: [tagtypes.fund],
            }),
        }),
    });

export const {
    useCreateDonationMutation,
    useGetAllFundsQuery,
    useGetFundByIdQuery,
    useUpdateFundMutation,
    useDeleteFundMutation,
    useUpdateFundStatusMutation,
} = apiService
