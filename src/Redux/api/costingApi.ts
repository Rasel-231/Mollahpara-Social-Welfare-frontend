import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface ITransaction {
    id: string;
    donorName: string;
    phone: string;
    email?: string | null;
    amount: number;
    paymentMethod: string;
    transactionId: string;
    purpose: string;
    message?: string | null;
    status: string;
    memberId?: string | null;
    costingId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICosting {
    id: string;
    projectName: string;
    description?: string | null;
    costing: number;
    createdAt: Date;
    updatedAt: Date;
    transactions?: ITransaction[];
}

export interface ICreateCosting {
    projectName: string;
    description?: string;
    costing: number;
}

const COSTING_URL = "costings";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.costing] })
    .injectEndpoints({
        endpoints: (build) => ({
            createCosting: build.mutation<IResponse<ICosting>, ICreateCosting>({
                query: (data) => ({ url: COSTING_URL, method: "POST", data }),
                invalidatesTags: [tagtypes.costing],
            }),
            getAllCostings: build.query<IResponse<ICosting[]>, void>({
                query: () => ({ url: COSTING_URL, method: "GET" }),
                providesTags: [tagtypes.costing],
            }),
            getCostingById: build.query<IResponse<ICosting>, string>({
                query: (id) => ({ url: `${COSTING_URL}/${id}`, method: "GET" }),
                providesTags: [tagtypes.costing],
            }),
            updateCosting: build.mutation<IResponse<ICosting>, { id: string; data: Partial<ICreateCosting> }>({
                query: ({ id, data }) => ({ url: `${COSTING_URL}/${id}`, method: "PATCH", data }),
                invalidatesTags: [tagtypes.costing],
            }),
            deleteCosting: build.mutation<IResponse<null>, string>({
                query: (id) => ({ url: `${COSTING_URL}/${id}`, method: "DELETE" }),
                invalidatesTags: [tagtypes.costing],
            }),
        }),
    });

export const {
    useCreateCostingMutation,
    useGetAllCostingsQuery,
    useGetCostingByIdQuery,
    useUpdateCostingMutation,
    useDeleteCostingMutation,
} = apiService;
