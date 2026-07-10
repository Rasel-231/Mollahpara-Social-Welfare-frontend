import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IScholarship {
    id: string;
    studentName: string;
    guardianName: string;
    dateOfBirth: string;
    nidOrBirthReg: string;
    institutionName: string;
    className: string;
    rollNumber: string;
    gpa: number;
    monthlyIncome: string;
    currentAddress: string;
    photoUrl?: string | null;
    marksheetUrl?: string | null;
    recommendationUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateScholarship {
    studentName: string;
    guardianName: string;
    dateOfBirth: string;
    nidOrBirthReg: string;
    institutionName: string;
    className: string;
    rollNumber: string;
    gpa: number;
    monthlyIncome: string;
    currentAddress: string;
}

const SCHOLARSHIP_URL = "scholarships";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.scholarship] })
    .injectEndpoints({
        endpoints: (build) => ({
            createScholarship: build.mutation<IResponse<IScholarship>, FormData>({
                query: (data) => ({
                    url: `${SCHOLARSHIP_URL}/apply`,
                    method: "POST",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                invalidatesTags: [tagtypes.scholarship],
            }),
            getAllScholarships: build.query<IResponse<IScholarship[]>, void>({
                query: () => ({
                    url: SCHOLARSHIP_URL,
                    method: "GET",
                }),
                providesTags: [tagtypes.scholarship],
            }),
            getScholarshipById: build.query<IResponse<IScholarship>, string>({
                query: (id) => ({
                    url: `${SCHOLARSHIP_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.scholarship],
            }),
            updateScholarship: build.mutation<IResponse<IScholarship>, { id: string; data: FormData }>({
                query: ({ id, data }) => ({
                    url: `${SCHOLARSHIP_URL}/${id}`,
                    method: "PATCH",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                invalidatesTags: [tagtypes.scholarship],
            }),
            deleteScholarship: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${SCHOLARSHIP_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.scholarship],
            }),
        }),
    });

export const {
    useCreateScholarshipMutation,
    useGetAllScholarshipsQuery,
    useGetScholarshipByIdQuery,
    useUpdateScholarshipMutation,
    useDeleteScholarshipMutation,
} = apiService;
