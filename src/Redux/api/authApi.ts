import { baseApi } from "../store/baseApi";
import { IResponse, IUser, tagtypes } from "../types/types";


const AUTH_URL = "auth";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.user] })
    .injectEndpoints({
        endpoints: (build) => ({
            login: build.mutation<{ accessToken: string; refreshToken: string; member: IUser }, { email: string; password: string }>({
                query: (loginData) => ({
                    url: `${AUTH_URL}/login`,
                    method: "POST",
                    data: loginData
                }),
                invalidatesTags: [tagtypes.user],
            }),
            profile: build.query<IResponse<IUser>, void>({
                query: () => ({
                    url: `${AUTH_URL}/profile`,
                    method: "GET",
                }),
                providesTags: [tagtypes.user],
            }),
            logout: build.mutation<void, { refreshToken: string }>({
                query: (body) => ({
                    url: `${AUTH_URL}/logout`,
                    method: "POST",
                    data: body,
                }),
                invalidatesTags: [tagtypes.user],
            }),
        }),
    });

export const {
    useLoginMutation,
    useProfileQuery,
    useLogoutMutation,
} = apiService 