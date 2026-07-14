import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IMonthlyChanda {
    id: string;
    name: string;
    phone?: string | null;
    month: string;
    year: number;
    amount: number;
    status: string;
    note?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateMonthlyChanda {
    name: string;
    phone?: string;
    month: string;
    year: number;
    amount: number;
    status?: string;
    note?: string;
}

const MONTHLY_CHANDA_URL = "monthly-chandas";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.monthlyChanda] })
    .injectEndpoints({
        endpoints: (build) => ({
            createMonthlyChanda: build.mutation<IResponse<IMonthlyChanda>, ICreateMonthlyChanda>({
                query: (data) => ({ url: MONTHLY_CHANDA_URL, method: "POST", data }),
                invalidatesTags: [tagtypes.monthlyChanda],
            }),
            getAllMonthlyChandas: build.query<IResponse<IMonthlyChanda[]>, string>({
                query: (search) => ({ url: MONTHLY_CHANDA_URL, method: "GET", params: search ? { search } : undefined }),
                providesTags: [tagtypes.monthlyChanda],
            }),
            getMonthlyChandaById: build.query<IResponse<IMonthlyChanda>, string>({
                query: (id) => ({ url: `${MONTHLY_CHANDA_URL}/${id}`, method: "GET" }),
                providesTags: [tagtypes.monthlyChanda],
            }),
            updateMonthlyChanda: build.mutation<IResponse<IMonthlyChanda>, { id: string; data: Partial<ICreateMonthlyChanda> }>({
                query: ({ id, data }) => ({ url: `${MONTHLY_CHANDA_URL}/${id}`, method: "PATCH", data }),
                invalidatesTags: [tagtypes.monthlyChanda],
            }),
            deleteMonthlyChanda: build.mutation<IResponse<null>, string>({
                query: (id) => ({ url: `${MONTHLY_CHANDA_URL}/${id}`, method: "DELETE" }),
                invalidatesTags: [tagtypes.monthlyChanda],
            }),
        }),
    });

export const {
    useCreateMonthlyChandaMutation,
    useGetAllMonthlyChandasQuery,
    useGetMonthlyChandaByIdQuery,
    useUpdateMonthlyChandaMutation,
    useDeleteMonthlyChandaMutation,
} = apiService;
