import { baseApi } from "../store/baseApi";
import { IResponse, IUser, tagtypes } from "../types/types";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<IResponse<IUser>, FormData>({
            query: (formData) => ({
                url: "users/create",
                method: "POST",
                data: formData,
                withCredentials: true,
            }),
            invalidatesTags: [tagtypes.user],
        }),


        getAllUsers: build.query<IResponse<IUser[]>, string>({
            query: (search) => ({
                url: "users",
                method: "GET",
                params: search ? { search } : undefined,
                withCredentials: true,
            }),
            providesTags: [tagtypes.user],
        }),

        getSingleUser: build.query<IResponse<IUser>, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: "GET",
                withCredentials: true,
            }),
            providesTags: [tagtypes.user],
        }),


        updateUser: build.mutation<IResponse<IUser>, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `users/${id}`,
                method: "PATCH",
                data: formData,
                withCredentials: true,
            }),
            invalidatesTags: [tagtypes.user],
        }),

        deleteUser: build.mutation<IResponse<void>, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
                withCredentials: true,
            }),
            invalidatesTags: [tagtypes.user],
        }),

        approveUser: build.mutation<IResponse<IUser>, string>({
            query: (id) => ({
                url: `users/${id}/approve`,
                method: "PATCH",
                withCredentials: true,
            }),
            invalidatesTags: [tagtypes.user],
        }),

        rejectUser: build.mutation<IResponse<IUser>, string>({
            query: (id) => ({
                url: `users/${id}/reject`,
                method: "PATCH",
                withCredentials: true,
            }),
            invalidatesTags: [tagtypes.user],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateUserMutation,
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useApproveUserMutation,
    useRejectUserMutation,
} = userApi;