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

const videos = "videos";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.video] })
    .injectEndpoints({
        endpoints: (build) => ({
            createVideo: build.mutation<IResponse<IVideo>, ICreateVideo>({
                query: (data) => ({
                    url: videos,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.video],
            }),
            getAllVideos: build.query<IResponse<IVideo[]>, void>({
                query: () => ({
                    url: videos,
                    method: "GET",
                }),
                providesTags: [tagtypes.video],
            }),
            getVideoById: build.query<IResponse<IVideo>, string>({
                query: (id) => ({
                    url: `${videos}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.video],
            }),
            updateVideo: build.mutation<IResponse<IVideo>, { id: string; data: Partial<IVideo> }>({
                query: ({ id, data }) => ({
                    url: `${videos}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.video],
            }),
            deleteVideo: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${videos}/${id}`,
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
