import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface INews {
    id: string;
    title: string;
    slug: string;
    content: string;
    image?: string | null;
    authorId: string;
    type: string;
    published: boolean;
    publishedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    author?: { id: string; name: string; email: string };
}

const NEWS_URL = "news";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.news] })
    .injectEndpoints({
        endpoints: (build) => ({
            createNews: build.mutation<IResponse<INews>, FormData>({
                query: (data) => ({
                    url: NEWS_URL,
                    method: "POST",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                invalidatesTags: [tagtypes.news],
            }),
            getAllNews: build.query<IResponse<INews[]>, string>({
                query: (search) => ({
                    url: NEWS_URL,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.news],
            }),
            getNewsById: build.query<IResponse<INews>, string>({
                query: (id) => ({
                    url: `${NEWS_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.news],
            }),
            updateNews: build.mutation<IResponse<INews>, { id: string; data: FormData }>({
                query: ({ id, data }) => ({
                    url: `${NEWS_URL}/${id}`,
                    method: "PATCH",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                invalidatesTags: [tagtypes.news],
            }),
            deleteNews: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${NEWS_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.news],
            }),
        }),
    });

export const {
    useCreateNewsMutation,
    useGetAllNewsQuery,
    useGetNewsByIdQuery,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
} = apiService;
