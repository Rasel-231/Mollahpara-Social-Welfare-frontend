import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IVideo {
    id: string;
    title: string;
    videoUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateVideo {
    title: string;
    videoUrl: string;
}

const VIDEO_URL = "videos";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.video] })
    .injectEndpoints({
        endpoints: (build) => ({
            createVideo: build.mutation<IResponse<IVideo>, ICreateVideo>({
                query: (data) => ({
                    url: VIDEO_URL,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.video],
            }),
            getAllVideos: build.query<IResponse<IVideo[]>, void>({
                query: () => ({
                    url: VIDEO_URL,
                    method: "GET",
                }),
                providesTags: [tagtypes.video],
            }),
            getVideoById: build.query<IResponse<IVideo>, string>({
                query: (id) => ({
                    url: `${VIDEO_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.video],
            }),
            updateVideo: build.mutation<IResponse<IVideo>, { id: string; data: Partial<IVideo> }>({
                query: ({ id, data }) => ({
                    url: `${VIDEO_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.video],
            }),
            deleteVideo: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${VIDEO_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.video],
            }),
        }),
    });

export const {
    useCreateVideoMutation,
    useGetAllVideosQuery,
    useGetVideoByIdQuery,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} = apiService;
