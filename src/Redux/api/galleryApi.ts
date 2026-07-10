import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IGallery {
    id: string;
    title: string;
    image: string;
    category?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const GALLERY_URL = "gallery";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.gallery] })
    .injectEndpoints({
        endpoints: (build) => ({
            createGallery: build.mutation<IResponse<IGallery>, FormData>({
                query: (data) => ({
                    url: `${GALLERY_URL}/upload`,
                    method: "POST",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                invalidatesTags: [tagtypes.gallery],
            }),
            getAllGalleries: build.query<IResponse<IGallery[]>, void>({
                query: () => ({
                    url: GALLERY_URL,
                    method: "GET",
                }),
                providesTags: [tagtypes.gallery],
            }),
            getGalleryById: build.query<IResponse<IGallery>, string>({
                query: (id) => ({
                    url: `${GALLERY_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.gallery],
            }),
            updateGallery: build.mutation<IResponse<IGallery>, { id: string; data: FormData }>({
                query: ({ id, data }) => ({
                    url: `${GALLERY_URL}/${id}`,
                    method: "PATCH",
                    data,
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                invalidatesTags: [tagtypes.gallery],
            }),
            deleteGallery: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${GALLERY_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.gallery],
            }),
        }),
    });

export const {
    useCreateGalleryMutation,
    useGetAllGalleriesQuery,
    useGetGalleryByIdQuery,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
} = apiService;
