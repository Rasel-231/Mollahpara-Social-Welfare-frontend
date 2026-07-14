import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IGalleryCategory {
    id: string;
    name: string;
    label: string;
    icon?: string | null;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

const GALLERY_CATEGORY_URL = "gallery-categories";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.galleryCategory] })
    .injectEndpoints({
        endpoints: (build) => ({
            createGalleryCategory: build.mutation<
                IResponse<IGalleryCategory>,
                Partial<IGalleryCategory>
            >({
                query: (data) => ({
                    url: GALLERY_CATEGORY_URL,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.galleryCategory],
            }),
            getAllGalleryCategories: build.query<
                IResponse<IGalleryCategory[]>,
                string
            >({
                query: (search) => ({
                    url: GALLERY_CATEGORY_URL,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.galleryCategory],
            }),
            getGalleryCategoryById: build.query<
                IResponse<IGalleryCategory>,
                string
            >({
                query: (id) => ({
                    url: `${GALLERY_CATEGORY_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.galleryCategory],
            }),
            updateGalleryCategory: build.mutation<
                IResponse<IGalleryCategory>,
                { id: string; data: Partial<IGalleryCategory> }
            >({
                query: ({ id, data }) => ({
                    url: `${GALLERY_CATEGORY_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.galleryCategory],
            }),
            deleteGalleryCategory: build.mutation<
                IResponse<null>,
                string
            >({
                query: (id) => ({
                    url: `${GALLERY_CATEGORY_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.galleryCategory],
            }),
        }),
    });

export const {
    useCreateGalleryCategoryMutation,
    useGetAllGalleryCategoriesQuery,
    useGetGalleryCategoryByIdQuery,
    useUpdateGalleryCategoryMutation,
    useDeleteGalleryCategoryMutation,
} = apiService;
