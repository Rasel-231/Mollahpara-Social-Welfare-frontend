import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IProjectFund {
    id: string;
    title: string;
    description?: string | null;
    amount: number;
    raised: number;
    category: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateProjectFund {
    title: string;
    description?: string;
    amount: number;
    raised?: number;
    category: string;
    status?: string;
}

const PROJECT_FUND_URL = "project-funds";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.projectFund] })
    .injectEndpoints({
        endpoints: (build) => ({
            createProjectFund: build.mutation<IResponse<IProjectFund>, ICreateProjectFund>({
                query: (data) => ({ url: PROJECT_FUND_URL, method: "POST", data }),
                invalidatesTags: [tagtypes.projectFund],
            }),
            getAllProjectFunds: build.query<IResponse<IProjectFund[]>, string>({
                query: (search) => ({ url: PROJECT_FUND_URL, method: "GET", params: search ? { search } : undefined }),
                providesTags: [tagtypes.projectFund],
            }),
            getProjectFundById: build.query<IResponse<IProjectFund>, string>({
                query: (id) => ({ url: `${PROJECT_FUND_URL}/${id}`, method: "GET" }),
                providesTags: [tagtypes.projectFund],
            }),
            updateProjectFund: build.mutation<IResponse<IProjectFund>, { id: string; data: Partial<ICreateProjectFund> }>({
                query: ({ id, data }) => ({ url: `${PROJECT_FUND_URL}/${id}`, method: "PATCH", data }),
                invalidatesTags: [tagtypes.projectFund],
            }),
            deleteProjectFund: build.mutation<IResponse<null>, string>({
                query: (id) => ({ url: `${PROJECT_FUND_URL}/${id}`, method: "DELETE" }),
                invalidatesTags: [tagtypes.projectFund],
            }),
        }),
    });

export const {
    useCreateProjectFundMutation,
    useGetAllProjectFundsQuery,
    useGetProjectFundByIdQuery,
    useUpdateProjectFundMutation,
    useDeleteProjectFundMutation,
} = apiService;
