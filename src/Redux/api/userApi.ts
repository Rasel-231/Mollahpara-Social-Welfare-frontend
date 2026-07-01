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


        getAllUsers: build.query<IResponse<IUser[]>, void>({
            query: () => ({
                url: "users",
                method: "GET",
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

        updateUser: build.mutation<IResponse<IUser>, { id: string; data: Partial<IUser> }>({
            query: ({ id, data }) => ({
                url: `users/update/${id}`,
                method: "PATCH",
                data: data,
                withCredentials: true,
            }),
            invalidatesTags: [tagtypes.user],
        }),

        deleteUser: build.mutation<IResponse<void>, string>({
            query: (id) => ({
                url: `users/delete/${id}`,
                method: "DELETE",
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
} = userApi;