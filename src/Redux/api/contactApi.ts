import { baseApi } from "../store/baseApi";
import { IResponse, tagtypes } from "../types/types";

export interface IContact {
    id: string;
    name: string;
    phone: string;
    village: string;
    designation: string;
    email?: string | null;
    subject: string;
    message: string;
    createdAt: Date;
}

export interface ICreateContact {
    name: string;
    phone: string;
    village: string;
    designation: string;
    email?: string;
    subject: string;
    message: string;
}

const CONTACT_URL = "contacts";

const apiService = baseApi
    .enhanceEndpoints({ addTagTypes: [tagtypes.contact] })
    .injectEndpoints({
        endpoints: (build) => ({
            createContact: build.mutation<IResponse<IContact>, ICreateContact>({
                query: (data) => ({
                    url: `${CONTACT_URL}/create`,
                    method: "POST",
                    data,
                }),
                invalidatesTags: [tagtypes.contact],
            }),
            getAllContacts: build.query<IResponse<IContact[]>, string>({
                query: (search) => ({
                    url: CONTACT_URL,
                    method: "GET",
                    params: search ? { search } : undefined,
                }),
                providesTags: [tagtypes.contact],
            }),
            getContactById: build.query<IResponse<IContact>, string>({
                query: (id) => ({
                    url: `${CONTACT_URL}/${id}`,
                    method: "GET",
                }),
                providesTags: [tagtypes.contact],
            }),
            updateContact: build.mutation<IResponse<IContact>, { id: string; data: Partial<IContact> }>({
                query: ({ id, data }) => ({
                    url: `${CONTACT_URL}/${id}`,
                    method: "PATCH",
                    data,
                }),
                invalidatesTags: [tagtypes.contact],
            }),
            deleteContact: build.mutation<IResponse<null>, string>({
                query: (id) => ({
                    url: `${CONTACT_URL}/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: [tagtypes.contact],
            }),
        }),
    });

export const {
    useCreateContactMutation,
    useGetAllContactsQuery,
    useGetContactByIdQuery,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = apiService;
